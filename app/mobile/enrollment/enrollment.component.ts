import { Component, OnInit } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform/platform';
import * as Permissions from 'nativescript-permissions';
import { Telephony } from 'nativescript-telephony';
import { SimCardData } from '~/canonicals/sim-card-data';
import { EnrollService } from '~/services/enroll.service';
import { Page } from 'ui/page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterExtensions } from 'nativescript-angular/router';
import { getString, setString } from 'tns-core-modules/application-settings';
import * as app from 'application';
import { userSession, simDataSession } from '~/canonicals/constants';
import * as Toast from 'nativescript-toast';
import { device } from 'tns-core-modules/platform';
import { TextField } from 'ui/text-field';
import { Account } from '~/models/account';
import * as dialog from 'ui/dialogs';

declare var android: any;

@Component({
  moduleId: module.id,
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  enrollForm: FormGroup;
  permissionDenied: boolean;

  constructor(private fb: FormBuilder, private page: Page, private enrollService: EnrollService, private router: RouterExtensions) {}

  ngOnInit() {
    this.permissionDenied = false;
    this.page.actionBarHidden = true;

    this.enrollForm = this.fb.group({
      phoneDDI: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    const userLogged = getString(userSession, '');
    if (!userLogged) {
      this.getReadSimCardDataPermission();
      return;
    }

    const account: Account = JSON.parse(getString(userSession, ''));
    const simData = new SimCardData();
    simData.phoneNumber = account.pan;
    this.doEnroll(simData);
  }

  sendToEnroll(): void {
    if (this.enrollForm.valid) {
      const simCardData = new SimCardData();
      const formValues = this.enrollForm.value;
      simCardData.phoneNumber = `+${formValues.phoneDDI}${formValues.phoneNumber}`;
      simCardData.deviceId = device.uuid;
      simCardData.deviceSoftwareVersion = device.osVersion;

      this.doEnroll(simCardData);
      return;
    }
    Toast.makeText('O Número informado é invalido. Tente novamente', '3000').show();
  }

  toNextField(fieldName: string): void {
    const field = <TextField>this.page.getViewById(fieldName);
    field.focus();
  }

  private getReadSimCardDataPermission(): void {
    if (isAndroid) {
      var readPhoneStatePermission = android.Manifest.permission.READ_PHONE_STATE;
      if (!Permissions.hasPermission(readPhoneStatePermission)) {
        Permissions.requestPermission(readPhoneStatePermission)
          .then(() => {
            this.readSimCardData();
          })
          .catch(() => {
            this.permissionDenied = true;
          });
      } else {
        // Se app já possui a permissão, faz a leitura.
        this.readSimCardData();
      }
    } else {
      // Não é necessário solicitar permissões no iOS, então faz a leitura.
      this.readSimCardData();
    }
  }

  private readSimCardData(): void {
    Telephony()
      .then(result => {
        var json = JSON.stringify(result);

        let simCardData = Object.assign(new SimCardData(), JSON.parse(json));
        if (simCardData.phoneNumber == null) {
          Toast.makeText('Não foi possivel obter os dados do seu dispositivo', '3000').show();
          this.permissionDenied = true;
        } else {
          this.doEnroll(simCardData);
        }
      })
      .catch(error => {
        Toast.makeText('Não foi possivel obter os dados do seu dispositivo', '3000').show();
        this.permissionDenied = true;
      });
  }

  private doEnroll(simCardData: SimCardData): void {
    this.enrollService.enroll(simCardData).subscribe(
      (result: any) => {
        setString(userSession, JSON.stringify(result.content));
        setString(simDataSession, JSON.stringify(simCardData));
        this.goToDashBoard(JSON.stringify(result));
      },
      error => {
        console.log(JSON.stringify(error));
        Toast.makeText('Não foi possivel obter os dados do seu dispositivo', '3000').show();
        this.permissionDenied = true;
      }
    );
  }

  private goToDashBoard(user: string): void {
    this.router.navigate(['dashboard'], {
      queryParams: {
        userLogged: user
      },
      clearHistory: true
    });
  }
}

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { AndroidData } from 'nativescript-ng-shadow';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as toast from 'nativescript-toast';
import { Page } from 'tns-core-modules/ui/page/page';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { TransactionService } from '~/services/transaction.service';
import { Buy, Transaction } from '~/models/transaction';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { userSession, simDataSession } from '~/canonicals/constants';
import { Account } from '~/models/account';
import { EnrollService } from '~/services/enroll.service';
import { SimCardData } from '~/canonicals/sim-card-data';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { ReceiptComponent } from '~/shared/receipt/receipt.component';
import { HttpErrorResponse } from '@angular/common/http';
import * as dialogs from 'ui/dialogs';

@Component({
  moduleId: module.id,
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  userLogged: Account;
  formShadow: AndroidData;
  buyForm: FormGroup;
  formatedPhone: string;

  constructor(
    private fb: FormBuilder,
    private router: RouterExtensions,
    private page: Page,
    private transactionService: TransactionService,
    private enrollService: EnrollService,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.userLogged = JSON.parse(getString(userSession, ''));
    this.formatedPhone = '';
    this.formShadow = {
      bgcolor: '#00897b',
      elevation: 6,
      cornerRadius: 5
    };

    this.buyForm = this.fb.group({
      establishmentNumber: [''],
      productValue: ['', Validators.required]
    });
  }

  register(): void {
    const productValue = parseFloat(this.buyForm.get('productValue').value).toFixed(2);

    const buyObj: Buy = {
      pan: this.userLogged.pan,
      amount: parseFloat(productValue)
      /*  establishmentNumber: this.buyForm.get('establishmentNumber').value */
    };

    this.transactionService.registerBuy(buyObj).subscribe(
      res => {
        toast.makeText('Compra realizada com sucesso', '3000').show();
        this.buyForm.reset();
        this.callModalReceipt(res.content);
      },
      (fail: HttpErrorResponse) => {
        const err = fail.error;
        const error = err.errors[0];

        dialogs.alert({
          title: 'Códido: ' + error.code,
          message: error.message,
          okButtonText: 'Ok'
        });
      }
    );
  }

  back(): void {
    this.router.navigate(['dashboard'], { clearHistory: true });
  }

  phoneMaxSize(event): void {
    let value = event.object.text;
    value = value.replace(/\D/g, '');

    if (value) {
      if (value.length === 13 || value.length === 19) {
        const field = <TextField>this.page.getViewById('productValue');
        field.focus();
      }
    }
  }

  formatPhoneNumber(event): void {
    let value: string = event.object.text;

    if (value) {
      value = value.replace(/\D/g, '');

      if (value.length < 11) {
        toast.makeText('Numero de telefone inválido, informe DDI, DDD e numero de telefone');
        this.buyForm.patchValue({
          establishmentNumber: ''
        });
      }

      value = value.replace(/^(\d{1,2})(\d)/, '+$1 $2');
      value = value.replace(/(\d{2})(\d{1})/, '($1) $2');
      value = value.replace(/(\d{4,5})(\d)/, '$1-$2');

      this.formatedPhone = value;
      this.buyForm.patchValue({
        establishmentNumber: '+' + value.replace(/\D/g, '')
      });
    }
  }

  private callModalReceipt(data: Transaction): void {
    let options: ModalDialogOptions = {
      context: data,
      fullscreen: false,
      viewContainerRef: this.vcRef
    };

    this.modalService.showModal(ReceiptComponent, options).then((result: any) => {});
  }
}

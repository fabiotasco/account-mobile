import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterExtensions } from 'nativescript-angular/router';
import { TransactionData } from '~/models/transaction';
import { BaseComponent } from '~/mobile/base.component';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { Page } from 'tns-core-modules/ui/page/page';
import { EnrollService } from '~/services/enroll.service';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { userSession } from '~/canonicals/constants';

@Component({
  moduleId: module.id,
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent extends BaseComponent implements OnInit {
  transferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected page: Page,
    protected router: RouterExtensions,
    protected enrollService: EnrollService,
    protected vcRef: ViewContainerRef,
    protected modalService: ModalDialogService
  ) {
    super(page, modalService, vcRef, router, enrollService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.transferForm = this.fb.group({
      pan: [''],
      transferValue: ['', Validators.required]
    });
  }

  register() {
    const transferValue = parseFloat(this.transferForm.get('transferValue').value).toFixed(2);

    const transferObj: TransactionData = {
      pan: getString(userSession),
      amount: parseFloat(transferValue)
    };

    this.dialogsHelper.alert({
      title: 'Em breve.',
      message: 'Esta funcionalidade estará disponivel em breve',
      okButtonText: 'Ok'
    });
  }
}

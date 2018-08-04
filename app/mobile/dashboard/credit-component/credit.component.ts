import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { userSession } from '~/canonicals/constants';
import { RouterExtensions } from 'nativescript-angular/router';
import { TransactionService } from '~/services/transaction.service';
import { TransactionData } from '~/models/transaction';
import { Account } from '~/models/account';
import { BaseComponent } from '~/mobile/base.component';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  moduleId: module.id,
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent extends BaseComponent implements OnInit {
  creditForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected router: RouterExtensions,
    private transactionService: TransactionService,
    protected vcRef: ViewContainerRef,
    protected modalService: ModalDialogService
  ) {
    super(modalService, vcRef, router);
  }

  ngOnInit() {
    super.ngOnInit();

    this.creditForm = this.fb.group({
      pan: [''],
      creditValue: ['', Validators.required]
    });
  }

  register() {
    const creditValue = parseFloat(this.creditForm.get('creditValue').value).toFixed(2);

    const creditObj: TransactionData = {
      pan: this.userLogged.pan,
      amount: parseFloat(creditValue)
    };

    this.transactionService.registerCredit(creditObj).subscribe(
      res => {
        this.toastHelper.makeText('Foi creditado em sua conta: R$' + creditObj.amount.toFixed(2), '3000').show();
        this.creditForm.reset();
        this.callModalReceipt(res.content);
      },
      (fail: HttpErrorResponse) => {
        const err = fail.error;
        const error = err.errors[0];

        this.dialogsHelper.alert({
          title: 'Códido: ' + error.code,
          message: error.message,
          okButtonText: 'Ok'
        });
      }
    );
  }
}

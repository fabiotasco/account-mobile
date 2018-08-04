import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterExtensions } from 'nativescript-angular/router';
import { TransactionService } from '~/services/transaction.service';
import { TransactionData } from '~/models/transaction';
import { BaseComponent } from '~/mobile/base.component';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { HttpErrorResponse } from '@angular/common/http';

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
    protected router: RouterExtensions,
    private transactionService: TransactionService,
    protected vcRef: ViewContainerRef,
    protected modalService: ModalDialogService
  ) {
    super(modalService, vcRef, router);
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
      pan: this.userLogged.pan,
      amount: parseFloat(transferValue)
    };

    this.dialogsHelper.alert({
      title: 'Em breve.',
      message: 'Esta funcionalidade estará disponivel em breve',
      okButtonText: 'Ok'
    });

    /* this.transactionService.registerCredit(transferObj).subscribe(
      res => {
        this.toastHelper.makeText('Foi creditado em sua conta: R$' + transferObj.amount.toFixed(2), '3000').show();
        this.transferForm.reset();
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
    ); */
  }
}

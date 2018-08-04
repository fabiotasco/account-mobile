import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '~/mobile/base.component';
import { RouterExtensions } from 'nativescript-angular/router';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { Transaction } from '~/models/transaction';
import { TransactionService } from '~/services/transaction.service';
import { transactions, simDataSession } from '~/canonicals/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { EnrollService } from '~/services/enroll.service';
import { SimCardData } from '~/canonicals/sim-card-data';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { Account } from '~/models/account';

@Component({
  moduleId: module.id,
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent extends BaseComponent implements OnInit {
  statements: Transaction[] = [];

  constructor(
    private enrollService: EnrollService,
    private transacttionService: TransactionService,
    protected router: RouterExtensions,
    protected vcRef: ViewContainerRef,
    protected modalService: ModalDialogService
  ) {
    super(modalService, vcRef, router);
  }

  ngOnInit() {
    super.ngOnInit();
    const simData: SimCardData = JSON.parse(getString(simDataSession, ''));

    this.enrollService.enroll(simData).subscribe((result: any) => {
      this.userLogged = result.content;
    });
    this.updateList();
  }

  getTransactionType(type): void {
    return transactions[type];
  }

  cancelTransaction(id: number): void {
    this.dialogsHelper
      .confirm({
        title: 'Cancelar Compra',
        message: 'Desseja realmente cancelar esta compra?',
        okButtonText: 'SIM',
        cancelButtonText: 'NÃO'
      })
      .then((result: boolean) => {
        if (result) {
          this.transacttionService.deleteTransaction(id).subscribe(
            (result: Transaction) => {
              this.userLogged.balance = this.userLogged.balance + result.amount;
              this.callModalReceipt(result);
              this.updateList();
            },
            (fail: HttpErrorResponse) => {
              const err = fail.error.errors[0];
              this.dialogsHelper.alert({
                title: 'Codigo: ' + err.code,
                message: err.message,
                okButtonText: 'Ok'
              });
            }
          );
        }
      });
  }

  private updateList(): void {
    this.transacttionService.getStatements(this.userLogged.pan).subscribe((transactions: Transaction[]) => {
      this.statements = transactions;
    });
  }
}

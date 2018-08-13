import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '~/mobile/base.component';
import { RouterExtensions } from 'nativescript-angular/router';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { Transaction } from '~/models/transaction';
import { TransactionService } from '~/services/transaction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnrollService } from '~/services/enroll.service';
import { Observable } from 'rxjs';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  moduleId: module.id,
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent extends BaseComponent implements OnInit {
  statements$: Observable<Transaction[]>;

  constructor(
    private transacttionService: TransactionService,
    protected page: Page,
    protected router: RouterExtensions,
    protected vcRef: ViewContainerRef,
    protected enrollService: EnrollService,
    protected modalService: ModalDialogService
  ) {
    super(page, modalService, vcRef, router, enrollService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.updateList();
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
              this.enrollService.updateAccountData();
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
    this.statements$ = this.transacttionService.getStatements();
  }
}

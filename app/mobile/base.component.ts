import { Transaction } from '~/models/transaction';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { ReceiptComponent } from '~/shared/receipt/receipt.component';
import { ViewContainerRef, OnInit } from '@angular/core';
import * as toast from 'nativescript-toast';
import * as dialogs from 'ui/dialogs';
import { RouterExtensions } from 'nativescript-angular/router';
import { userSession } from '~/canonicals/constants';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { Account } from '~/models/account';

export class BaseComponent implements OnInit {
  userLogged: Account;
  toastHelper = toast;
  dialogsHelper = dialogs;

  constructor(protected modalService: ModalDialogService, protected vcRef: ViewContainerRef, protected router: RouterExtensions) {}

  ngOnInit() {
    this.userLogged = JSON.parse(getString(userSession, ''));
  }

  protected callModalReceipt(data: Transaction): void {
    let options: ModalDialogOptions = {
      context: data,
      fullscreen: false,
      viewContainerRef: this.vcRef
    };

    this.modalService.showModal(ReceiptComponent, options).then((result: any) => {});
  }

  protected back(): void {
    this.router.navigate(['/dashboard'], { clearHistory: true });
  }
}

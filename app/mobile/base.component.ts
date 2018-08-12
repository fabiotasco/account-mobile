import { Transaction } from '~/models/transaction';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { ReceiptComponent } from '~/shared/receipt/receipt.component';
import { ViewContainerRef, OnInit } from '@angular/core';
import * as toast from 'nativescript-toast';
import * as dialogs from 'tns-core-modules/ui/dialogs/dialogs';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { EnrollService } from '~/services/enroll.service';

export class BaseComponent implements OnInit {
  toastHelper = toast;
  dialogsHelper = dialogs;

  constructor(
    protected page: Page,
    protected modalService: ModalDialogService,
    protected vcRef: ViewContainerRef,
    protected router: RouterExtensions,
    protected enrollService: EnrollService
  ) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
    /*  this.accountPan = getString(userSession, '');
    const simData = new SimCardData();
    simData.phoneNumber = this.accountPan; */
    this.enrollService.account$;
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

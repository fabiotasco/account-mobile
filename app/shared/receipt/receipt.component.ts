import { Component, OnInit, Input } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import { Transaction } from '~/models/transaction';
import { transactions } from '~/canonicals/constants';
@Component({
  moduleId: module.id,
  selector: 'pimpo-receipt',
  templateUrl: 'receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  transaction: Transaction;

  constructor(private params: ModalDialogParams) {}

  ngOnInit() {
    this.transaction = new Transaction();

    this.transaction = this.params.context;
  }

  close(): void {
    this.params.closeCallback();
  }

  getTransactionType(type): void {
    return transactions[type];
  }
}

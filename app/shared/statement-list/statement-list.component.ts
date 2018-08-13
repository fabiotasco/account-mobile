import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '~/models/transaction';
import { transactions } from '~/canonicals/constants';

@Component({
  moduleId: module.id,
  selector: 'statement-list',
  templateUrl: './statement-list.component.html',
  styleUrls: ['./statement-list.component.css']
})
export class StatementListComponent implements OnInit {
  @Input()
  statements: Transaction[] = [];
  @Input()
  showActionButton = false;
  @Output()
  deleteAction = new EventEmitter();

  ngOnInit() {}

  deleteActionTap(value: number): void {
    this.deleteAction.emit(value);
  }

  getTransactionType(type): void {
    return transactions[type];
  }
}

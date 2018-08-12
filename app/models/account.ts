import { Transaction } from '~/models/transaction';

export class Account {
  id: number;
  pan: string;
  balance: number = 0;
  status: string;
  transactions: Transaction[] = [];
  constructor() {}
}

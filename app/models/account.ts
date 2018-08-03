import { Transaction } from '~/models/transaction';

export class Account {
  id: number;
  pan: string;
  balance: number;
  status: string;
  transactions: Transaction[] = [];
  constructor() {}
}

export class Transaction {
  id: number;
  type: string;
  amount: number;
  createdAt: Date;
  original: Transaction;

  constructor() {}
}

export interface TransactionData {
  pan: string;
  amount: number;
  /* establishmentNumber: number; */
}

import { Component, OnInit } from '@angular/core';
import { Transaction } from '~/models/transaction';
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable } from 'rxjs';
import { TransactionService } from '~/services/transaction.service';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  transactions$: Observable<Transaction[]>;

  active = 'statement';
  constructor(private router: RouterExtensions, private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactions$ = this.transactionService.getStatements();
  }

  goToBuyScreen(): void {
    this.active = 'buy';
    this.router.navigate(['dashboard/buy'], {
      transition: {
        name: 'slide',
        duration: 150,
        curve: 'linear'
      }
    });
  }

  goToCreditScreen(): void {
    this.active = 'credit';
    this.router.navigate(['dashboard/credit'], {
      transition: {
        name: 'slide',
        duration: 150,
        curve: 'linear'
      }
    });
  }

  goToStatementScreen(): void {
    this.active = 'statement';
    this.router.navigate(['dashboard/statement'], {
      transition: {
        name: 'slide',
        duration: 150,
        curve: 'linear'
      }
    });
  }

  goToTransferScreen(): void {
    this.active = 'transfer';
    this.router.navigate(['dashboard/transfer'], {
      transition: {
        name: 'slide',
        duration: 150,
        curve: 'linear'
      }
    });
  }

  goToMyAccountScreen(): void {
    this.active = 'account';
    this.router.navigate(['dashboard/my-account'], {
      transition: {
        name: 'slide',
        duration: 150,
        curve: 'linear'
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { userSession, simDataSession } from '~/canonicals/constants';
import { Account } from '~/models/account';
import { Transaction } from '~/models/transaction';
import { RouterExtensions } from 'nativescript-angular/router';
import * as Toast from 'nativescript-toast';
import { EnrollService } from '~/services/enroll.service';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  account: Account;
  constructor(private router: RouterExtensions, private enrollService: EnrollService) {}

  ngOnInit() {
    console.log('NgOnInit');
    this.account = new Account();

    const simData = JSON.parse(getString(simDataSession, ''));
    this.enrollService.enroll(simData).subscribe(
      (res: any) => {
        this.account = res.content;
      },
      (error: any) => {
        alert('Ouve um problema e não foi posivel encontrar seu usuário, feche o aplicativo e abra novamente.');
      }
    );
  }

  onItemTap(event): void {
    Toast.makeText('Clicou no item: tal...', '3000').show();
  }

  getTransactionType(type: string) {
    const transactions = {
      credit: 'Crédito',
      purchase: 'Compra',
      cancel: 'Cancelamento'
    };

    return transactions[type];
  }

  goToBuyScreen(): void {
    this.router.navigate(['dashboard/buy'], {
      transition: {
        name: 'slide',
        duration: 150,
        curve: 'linear'
      }
    });
  }
  goToCreditScreen(): void {
    this.router.navigate(['dashboard/credit'], {
      transition: {
        name: 'slide',
        duration: 150,
        curve: 'linear'
      }
    });
  }
}

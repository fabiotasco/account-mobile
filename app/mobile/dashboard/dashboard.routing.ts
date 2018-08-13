import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { DashboardComponent } from '~/mobile/dashboard/dashboard.component';
import { BuyComponent } from '~/mobile/dashboard/buy-component/buy.component';
import { CreditComponent } from '~/mobile/dashboard/credit-component/credit.component';
import { StatementComponent } from '~/mobile/dashboard/statement-component/statement.component';
import { TransferComponent } from '~/mobile/dashboard/transfer-component/transfer.component';
import { MyAccountComponent } from '~/mobile/dashboard/my-account/my-account.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/statement', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'buy', component: BuyComponent },
      { path: 'credit', component: CreditComponent },
      { path: 'statement', component: StatementComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'my-account', component: MyAccountComponent }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class DashboardRoutingModule {}

export const routedComponents = [DashboardComponent];

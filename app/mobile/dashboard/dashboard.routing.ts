import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { DashboardComponent } from './dashboard.component';
import { BuyComponent } from './buy-component/buy.component';
import { CreditComponent } from '~/mobile/dashboard/credit-component/credit.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'credit', component: CreditComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class DashboardRoutingModule {}

export const routedComponents = [DashboardComponent];

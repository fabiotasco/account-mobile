import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { BuyComponent } from './buy-component/buy.component';

const routes: Routes = [{ path: '', component: DashboardComponent }, { path: 'buy', component: BuyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

export const routedComponents = [DashboardComponent];

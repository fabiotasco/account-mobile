import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { BuyComponent } from './buy-component/buy.component';
import { NgShadowModule } from 'nativescript-ng-shadow';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { SharedModule } from '~/shared/shared.module';
import { CreditComponent } from '~/mobile/dashboard/credit-component/credit.component';
import { StatementComponent } from '~/mobile/dashboard/statement-component/statement.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    DashboardRoutingModule,
    NgShadowModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [],
  declarations: [DashboardComponent, BuyComponent, CreditComponent, StatementComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardModule {}
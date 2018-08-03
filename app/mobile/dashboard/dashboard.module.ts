import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { BuyComponent } from './buy-component/buy.component';
import { NgShadowModule } from 'nativescript-ng-shadow';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { SharedModule } from '~/shared/shared.module';

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
  declarations: [DashboardComponent, BuyComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardModule {}

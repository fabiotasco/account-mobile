import { NgModule } from '@angular/core';
import { Routes, PreloadAllModules } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { EnrollmentComponent } from '~/mobile/enrollment/enrollment.component';

const routes: Routes = [
  { path: '', redirectTo: '/account-verification', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: './mobile/dashboard/dashboard.module#DashboardModule' },
  { path: 'account-verification', component: EnrollmentComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}

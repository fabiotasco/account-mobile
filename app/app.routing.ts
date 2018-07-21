import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { EnrollmentComponent } from "~/mobile/enrollment/enrollment.component";

const routes: Routes = [
	{ path: "", redirectTo: "/account-verification", pathMatch: "full" },
	{ path: "account-verification", component: EnrollmentComponent }
];

export const navigatableComponents = [
	EnrollmentComponent
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
	exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
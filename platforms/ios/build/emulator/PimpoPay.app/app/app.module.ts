import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";

import { AppRoutingModule, navigatableComponents } from "./app.routing";
import { AppComponent } from "./app.component";

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		NativeScriptModule,
		NativeScriptFormsModule,
		NativeScriptHttpModule,
		AppRoutingModule
	],
	declarations: [
		AppComponent,
		...navigatableComponents
	],
	providers: [
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class AppModule { }
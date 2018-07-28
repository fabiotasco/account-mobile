import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { AppRoutingModule, navigatableComponents } from "~/app.routing";
import { AppComponent } from "~/app.component";
import { EnrollService } from "~/services/enroll.service";

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		NativeScriptModule,
		NativeScriptFormsModule,
		NativeScriptHttpClientModule,
		AppRoutingModule
	],
	declarations: [
		AppComponent,
		...navigatableComponents
	],
	providers: [
		EnrollService
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class AppModule { }
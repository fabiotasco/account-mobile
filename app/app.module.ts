import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { AppRoutingModule } from '~/app.routing';
import { AppComponent } from '~/app.component';
import { EnrollService } from '~/services/enroll.service';
import { EnrollmentComponent } from '~/mobile/enrollment/enrollment.component';
import { ReactiveFormsModule } from '@angular/forms';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { TransactionService } from '~/services/transaction.service';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';

registerLocaleData(ptBr);

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptFormsModule, NativeScriptHttpClientModule, AppRoutingModule, ReactiveFormsModule],
  declarations: [AppComponent, EnrollmentComponent],
  providers: [
    EnrollService,
    TransactionService,
    ModalDialogService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}

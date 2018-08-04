import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ReceiptComponent } from './receipt/receipt.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

@NgModule({
  imports: [NativeScriptCommonModule],
  exports: [ReceiptComponent],
  declarations: [ReceiptComponent],
  providers: [],
  entryComponents: [ReceiptComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ReceiptComponent } from '~/shared/receipt/receipt.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { CustomAndroidActionBarComponent } from '~/shared/custom-android-actionbar/custom-android-actionbar.component';
import { StatementListComponent } from '~/shared/statement-list/statement-list.component';

@NgModule({
  imports: [NativeScriptCommonModule],
  exports: [ReceiptComponent, CustomAndroidActionBarComponent, StatementListComponent],
  declarations: [ReceiptComponent, CustomAndroidActionBarComponent, StatementListComponent],
  providers: [],
  entryComponents: [ReceiptComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}

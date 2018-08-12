import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '~/models/account';
import { EnrollService } from '~/services/enroll.service';
import { map } from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'custom-android-actionbar',
  templateUrl: './custom-android-actionbar.component.html',
  styleUrls: ['./custom-android-actionbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomAndroidActionBarComponent implements OnInit {
  balance$: Observable<number>;
  constructor(private enrollService: EnrollService) {}

  ngOnInit() {
    this.balance$ = this.enrollService.account$.pipe(map((account: Account) => account.balance));
  }
}

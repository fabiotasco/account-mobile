import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SimCardData } from '~/canonicals/sim-card-data';
import { Api } from '~/canonicals/api';
import { Account } from '~/models/account';
import { map, tap, publishLast, refCount, timeout } from 'rxjs/operators';
@Injectable()
export class EnrollService {
  private accountSubject: Subject<Account> = new BehaviorSubject<Account>(new Account());
  private simData: SimCardData;
  account$: Observable<Account> = this.accountSubject.asObservable();

  constructor(private http: HttpClient) {}

  enroll(simCardData: SimCardData) {
    this.simData = simCardData;
    return this.http.post(Api.url + '/account/enroll', JSON.stringify(simCardData), { headers: this.createRequestOptions() }).pipe(
      map((result: any) => {
        return result.content;
      }),
      tap((account: Account) => this.accountSubject.next(account)),
      publishLast(),
      refCount(),
      timeout(2000)
    );
  }

  updateAccountData(): void {
    this.enroll(this.simData).subscribe();
  }

  private createRequestOptions() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }
}

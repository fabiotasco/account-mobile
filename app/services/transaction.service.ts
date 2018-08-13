import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransactionData, Transaction } from '~/models/transaction';
import { Api } from '~/canonicals/api';
import * as _ from 'lodash';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { userSession } from '~/canonicals/constants';

@Injectable()
export class TransactionService {
  constructor(private httpClient: HttpClient) {}

  registerBuy(data: TransactionData): Observable<any> {
    return this.httpClient.post(Api.url + '/account/purchase', JSON.stringify(data), { headers: this.createRequestOptions() });
  }

  registerCredit(data: TransactionData): Observable<any> {
    return this.httpClient.post(Api.url + '/account/credit', JSON.stringify(data), { headers: this.createRequestOptions() });
  }

  getStatements(): Observable<Transaction[]> {
    const pan = getString(userSession);
    const endpoint = `${Api.url}/account/pan/${pan}/transactions`;
    return this.httpClient.get(endpoint, { headers: this.createRequestOptions() }).pipe(
      map((result: any) => {
        return _.orderBy(result.content, ['createdAt'], ['desc']);
      })
    );
  }

  deleteTransaction(id: number): Observable<any> {
    const endpoint = `${Api.url}/account/transaction/${id}/cancel`;
    return this.httpClient.delete(endpoint, { headers: this.createRequestOptions() }).pipe(
      map((result: any) => {
        return result.content;
      })
    );
  }

  private createRequestOptions() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }
}

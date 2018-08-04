import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransactionData } from '~/models/transaction';
import { Api } from '~/canonicals/api';
import * as _ from 'lodash';

@Injectable()
export class TransactionService {
  constructor(private httpClient: HttpClient) {}

  registerBuy(data: TransactionData): Observable<any> {
    return this.httpClient.post(Api.url + '/account/purchase', JSON.stringify(data), { headers: this.createRequestOptions() });
  }

  registerCredit(data: TransactionData): Observable<any> {
    return this.httpClient.post(Api.url + '/account/credit', JSON.stringify(data), { headers: this.createRequestOptions() });
  }

  getStatements(pan: string): Observable<any> {
    /* TODO: possivelmente este método irá receber parametros para montar a chamada e filtrar os extratos. */
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

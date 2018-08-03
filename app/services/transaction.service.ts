import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Buy } from '~/models/transaction';
import { Api } from '~/canonicals/api';

@Injectable()
export class TransactionService {
  constructor(private httpClient: HttpClient) {}

  registerBuy(data: Buy): Observable<any> {
    return this.httpClient.post(Api.url + '/account/purchase', JSON.stringify(data), { headers: this.createRequestOptions() });
  }

  private createRequestOptions() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }
}

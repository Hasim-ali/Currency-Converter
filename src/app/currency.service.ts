import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private openExchangeRatesAppId = '8840c42da43f4ba6afbddf4f8139b2fc'

  constructor(private http: HttpClient) { }

  convertCurrency(date: string, base: string, symbols: string[]): Observable<any> {
    const url = `https://openexchangerates.org/api/historical/${date}.json`;

    let params = new HttpParams();
    params = params.append('app_id', this.openExchangeRatesAppId);
    params = params.append('base', base);
    params = params.append('symbols', symbols.join(','));

    return this.http.get(url, { params });
  }
}

import { Component } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent {
  date: string = '';
  baseCurrency: string = 'USD';
  symbols: string = '';
  conversionResult: any;
  errorMessage: string = '';
  Maxdate: any = '';
  // Example list of suggested symbols
  suggestedSymbols: string[] = [
    'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD',
    'CHF', 'CNY', 'SEK', 'NZD', 'MXN', 'SGD',
    'HKD', 'NOK', 'KRW', 'TRY', 'INR', 'RUB',
    'BRL', 'ZAR', 'DKK', 'PLN', 'THB', 'IDR',
    'HUF', 'CZK', 'ILS', 'CLP', 'PHP', 'AED',
    'SAR', 'RON', 'MYR', 'COP', 'ARS', 'TWD',
    'VND', 'NGN', 'UAH', 'EGP', 'PKR', 'IQD',
    'BDT', 'KES', 'KWD', 'CLF', 'IRR', 'DZD',
    'OMR', 'QAR', 'MAD', 'CUC', 'PYG', 'GTQ',
    'HRK', 'XAF', 'ETB', 'RSD', 'SDG', 'VEF',
    'BOB', 'TZS', 'TND', 'AFN', 'LBP', 'XOF',
    'UGX', 'YER', 'XAU', 'NPR', 'CRC', 'BHD',
    'BND', 'BYN', 'ISK', 'JMD', 'MUR', 'MKD',
    'LKR', 'UAH', 'GEL', 'ALL', 'GHS', 'DOP',
    'XCD', 'UZS', 'TMT', 'SZL', 'AOA', 'AZN',
    'MZN', 'TJS', 'BAM', 'HTG', 'BWP', 'FJD',
    'XPF', 'SCR', 'GNF', 'ZMW', 'LAK', 'MNT',
    'MOP', 'MVR', 'BIF', 'SLL', 'KYD', 'NAD',
    'MWK', 'CDF', 'ERN', 'TOP', 'DJF', 'GNF',
    'BSD', 'BZD', 'SRD', 'ANG', 'SBD', 'VUV',
    'WST', 'STD', 'FKP', 'CUP', 'KGS', 'LSL',
    'LRD', 'MGA', 'MDL', 'MRO', 'KMF', 'XPF',
    'SZL', 'TJS', 'SVC', 'GNF', 'XAF', 'XOF',
    'YER', 'SRD', 'TRY', 'ZWL', 'SOS', 'HTG',
    'PGK', 'QAR', 'OMR', 'NIO', 'LYD', 'LKR',
    'KHR', 'KPW', 'JOD', 'GYD', 'GIP', 'FKP',
    'ERN', 'ETB', 'CVE', 'BMD', 'BIF', 'ANG',
    'AMD', 'MAD', 'DJF', 'KYD', 'BSD', 'AWG',
    'XCD', 'MRO', 'DZD', 'SYP', 'SLL', 'RWF',
    'KPW', 'VUV', 'UZS', 'TMT', 'KHR', 'PGK',
    'MMK', 'KGS', 'KMF', 'FJD', 'CVE', 'BTN',
    'BIF', 'SYP', 'STD', 'RWF', 'KPW', 'XPF',
    'VUV', 'TOP', 'SLL', 'RSD', 'PGK', 'MMK',
    'KGS', 'KMF', 'BTN', 'ANG', 'SVC', 'ERN',
    'CVE', 'SYP', 'KPW', 'XPF', 'VUV', 'TOP',
    'SLL', 'RSD', 'PGK', 'MMK', 'KGS', 'KMF',
    'BTN', 'ANG', 'SVC', 'ERN', 'CVE', 'SYP',
    'KPW', 'XPF', 'VUV', 'TOP', 'SLL', 'RSD',
    'PGK', 'MMK', 'KGS', 'KMF', 'BTN', 'ANG',
    'SVC', 'ERN', 'CVE', 'SYP', 'KPW', 'XPF',
    'VUV', 'TOP', 'SLL', 'RSD', 'PGK', 'MMK',
    'KGS', 'KMF', 'BTN', 'ANG', 'SVC', 'ERN',
    'CVE', 'SYP', 'KPW', 'XPF', 'VUV', 'TOP',
    'SLL', 'RSD', 'PGK', 'MMK', 'KGS', 'KMF',
    'BTN', 'ANG', 'SVC', 'ERN', 'CVE', 'SYP',
    'KPW', 'XPF', 'VUV', 'TOP', 'SLL', 'RSD',
    'PGK', 'MMK', 'KGS', 'KMF', 'BTN', 'ANG',
    'SVC', 'ERN', 'CVE', 'SYP', 'KPW', 'XPF',
    'VUV', 'TOP', 'SLL', 'RSD', 'PGK', 'MMK',
    'KGS', 'KMF', 'BTN', 'ANG', 'SVC', 'ERN',
    'CVE', 'SYP', 'KPW', 'XPF', 'VUV', 'TOP',
    'SLL', 'RSD', 'PGK', 'MMK', 'KGS', 'KMF',
    'BTN', 'ANG', 'SVC', 'ERN', 'CVE', 'SYP',
    'KPW', 'XPF', 'VUV', 'TOP', 'SLL', 'RSD',
    'PGK', 'MMK', 'KGS', 'KMF', 'BTN', 'ANG',
    'SVC', 'ERN', 'CVE', 'SYP', 'KPW', 'XPF',
    'VUV', 'TOP', 'SLL', 'RSD', 'PGK', 'MMK',
    'KGS', 'KMF', 'BTN', 'ANG', 'SVC', 'ERN',
    'CVE', 'SYP', 'KPW', 'XPF', 'VUV', 'TOP',
    'SLL', 'RSD', 'PGK', 'MMK', 'KGS', 'KMF',
    'BTN', 'ANG', 'SVC', 'ERN', 'CVE', 'SYP',
    'KPW', 'XPF', 'VUV', 'TOP', 'SLL', 'RSD',
    'PGK', 'MMK', 'KGS', 'KMF', 'BTN', 'ANG',
    'SVC', 'ERN', 'CVE', 'SYP', 'KPW', 'XPF',
    'VUV', 'TOP', 'SLL', 'RSD', 'PGK', 'MMK',
    'KGS', 'KMF', 'BTN', 'ANG', 'SVC', 'ERN',
    'CVE', 'SYP', 'KPW', 'XPF', 'VUV', 'TOP',
    'SLL', 'RSD', 'PGK', 'MMK', 'KGS', 'KMF',
    'BTN', 'ANG', 'SVC', 'ERN', 'CVE', 'SYP',
    'KPW', 'XPF', 'VUV', 'TOP', 'SLL', 'RSD',
    'PGK', 'MMK', 'KGS', 'KMF', 'BTN', 'ANG',
    'SVC', 'ERN', 'CVE', 'SYP', 'KPW', 'XPF',
    'VUV', 'TOP', 'SLL', 'RSD', 'PGK', 'MMK',
    'KGS', 'KMF', 'BTN', 'ANG', 'SVC', 'ERN',
    'CVE', 'SYP', 'KPW', 'XPF', 'VUV', 'TOP',
    'SLL', 'RSD', 'PGK', 'MMK', 'KGS', 'KMF',
    'BTN', 'ANG', 'SVC', 'ERN', 'CVE', 'SYP',
    'KPW', 'XPF', 'VUV', 'TOP', 'SLL', 'RSD',
    'PGK', 'MMK', 'KGS', 'KMF', 'BTN', 'ANG',
    'SVC', 'ERN', 'CVE', 'SYP', 'KPW', 'XPF',
    'VUV', 'TOP', 'SLL', 'RSD', 'PGK', 'MMK',
    'KGS', 'KMF', 'BTN', 'ANG', 'SVC', 'ERN',
    'CVE', 'SYP', 'KPW', 'XPF', 'VUV', 'TOP',
    'SLL', 'RSD', 'PGK', 'MMK', 'KGS', 'KMF',
    'BTN', 'ANG', 'SVC', 'ERN', 'CVE', 'SYP',
    'KPW', 'XPF', 'VUV', 'TOP', 'SLL', 'RSD',
    'PGK', 'MMK', 'KGS', 'KMF', 'BTN', 'ANG',
    'SVC', 'ERN', 'CVE', 'SYP', 'KPW', 'XPF',
    'VUV', 'TOP', 'SLL', 'RSD', 'PGK', 'MMK',
    'KGS', 'KMF', 'BTN', 'ANG', 'SVC', 'ERN',
    'CVE', 'SYP', 'KPW', 'XPF', 'VUV', 'TOP',
    'SLL', 'RSD', 'PGK', 'MMK', 'KGS', 'KMF',
    'BTN', 'ANG', 'SVC', 'ERN', 'CVE', 'SYP',
    'KPW', 'XPF', 'VUV', 'TOP', 'SLL', 'RSD',
    'PGK', 'MMK', 'KGS', 'KMF', 'BTN', 'ANG'];

  // Autocomplete functionality
  symbolControl = new FormControl();
  filteredSymbols: Observable<string[]>;


  constructor(private CurrencyService: CurrencyService) {
    this.filteredSymbols = this.symbolControl.valueChanges
      .pipe(
        startWith(''),
        map(symbol => symbol ? this.filterSymbols(symbol) : this.suggestedSymbols.slice())
      );
  }
  ngOnInit(): void {
    this.Maxdate = new Date();

  }

  filterSymbols(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.suggestedSymbols.filter(symbol => symbol.toLowerCase().includes(filterValue));
  }

  convertCurrency(): void {
    if (!this.date || !this.symbols) {
      this.errorMessage = 'Date and symbols are mandatory';
      return;
    }

    this.CurrencyService.convertCurrency(this.date, this.baseCurrency, this.symbols.split(','))
      .subscribe(response => {
        this.conversionResult = response;
        this.errorMessage = '';
      }, error => {
        console.error(error);
        this.errorMessage = 'An error occurred while fetching conversion data';
      });
  }
  getMaxDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

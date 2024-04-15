import { Component } from '@angular/core';
import { CurrencyService } from '../currency.service';

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

  constructor(private CurrencyService: CurrencyService) { }

  ngOnInit(): void {
  }

  convertCurrency(): void {
    if (!this.date || !this.symbols) {
      this.errorMessage = 'Date and symbols are mandatory';
      return;
    }

    this.CurrencyService.convertCurrency(this.date, this.baseCurrency, this.symbols.split(','))
      .subscribe(response => {
        this.conversionResult = response;
        console.log(this.conversionResult);
        this.errorMessage = '';
      }, error => {
        console.error(error);
        this.errorMessage = 'An error occurred while fetching conversion data';
      });
  }
}

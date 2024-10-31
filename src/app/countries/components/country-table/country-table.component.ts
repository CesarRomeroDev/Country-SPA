import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-table',
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {
  @Input()  //vamos a recibir data del padre by-capital-page.component
  public countriesTable: Country[] = [];
}

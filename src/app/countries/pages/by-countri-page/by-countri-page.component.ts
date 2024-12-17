import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-countri-page',
  templateUrl: './by-countri-page.component.html',
  styleUrl: './by-countri-page.component.css'
})
export class ByCountriPageComponent implements OnInit{

  public countries: Country[] = []; //para usarlo en el html
  public initialValue: string = '';

  constructor(
    private countriesService: CountriesService //inyeccion de servicios
  ){}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;

  }

  searchByCountri( term: string ){
    this.countriesService.searchCountry(term)
    .subscribe( countries => {
      this.countries = countries;
    })
  }
}

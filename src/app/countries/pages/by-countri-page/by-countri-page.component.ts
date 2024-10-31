import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-countri-page',
  templateUrl: './by-countri-page.component.html',
  styleUrl: './by-countri-page.component.css'
})
export class ByCountriPageComponent {

  public countries: Country[] = []; //para usarlo en el html

  constructor(
    private countriesService: CountriesService //inyeccion de servicios
  ){}

  searchByCountri( term: string ){
    this.countriesService.searchCountry(term)
    .subscribe( countries => {
      this.countries = countries;
    })
  }
}

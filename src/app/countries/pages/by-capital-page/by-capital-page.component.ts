import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  public countries: Country[] = []; //para usarlo en el html

  constructor(
    private countriesServices: CountriesService //inyección de servicios
  ){}

  searchByCapital( term: string ){ //metodo
    //Nos subcribimos al observable, es necesario
    this.countriesServices.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;
      });
  }
}

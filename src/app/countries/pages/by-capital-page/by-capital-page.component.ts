import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = []; //para usarlo en el html
  public isLoading: boolean = false; //por defecto es false por que cuando se inicia la página no estoy buscando
  public initialValue: string = '';

  constructor(
    private countriesServices: CountriesService //inyección de servicios
  ){}

  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.byCapital.countries;
    this.initialValue = this.countriesServices.cacheStore.byCapital.term;
  }

  searchByCapital( term: string ){ //metodo
    this.isLoading = true //es aqui donde ya estoy buscando
    //Nos subcribimos al observable, es necesario
    this.countriesServices.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false; //cuando termina de cargarse la informacion quitamos la carga
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  constructor(
    private http: HttpClient
  ) {
    this.loadFromLocalStorage();
   }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStorage', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage() {
    if( !localStorage.getItem( 'cacheStorage' ) ) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStorage')! );
  }

  private getCountriesReequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( () => of( [] ) ),
     /* delay(2000),   delay Retrasa la emisión de elementos de la fuente
      Observable por un tiempo de espera determinado o hasta una fecha determinada.*/
    );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null>{ //solo vamos a regresar 1 país
    const url = `${this.apiUrl}/alpha/${ code }`;

    return this.http.get<Country[]>( url )
    .pipe(
      //Si countries es mayor a cero (osea que hay uno o mas) entonces voy a regresar contries[0] encontrado en la posicion cero, de lo contrario si no existe mandamos null
      map( countries => countries.length > 0 ? countries[0]: null ), //sirve para transformar la información
      catchError( () => of( null ) )
    )
  }

  searchCapital( term: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${ term }`;
    return this.getCountriesReequest(url)
    .pipe(
      tap( countries =>  this.cacheStore.byCapital = { term: term, countries: countries }),
      tap( () => this.saveToLocalStorage() )
    )
  }

  searchCountry( term: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesReequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountries = { term, countries } ),
      tap( () => this.saveToLocalStorage() )
    )
  }

  searchRegion( region: Region ): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesReequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = { region, countries } ),
      tap( () => this.saveToLocalStorage() )
    )
  }

}

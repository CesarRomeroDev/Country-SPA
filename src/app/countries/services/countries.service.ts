import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

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
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of( [] ) )
    );
  }

  searchCountry( term: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>( url)
    .pipe(
      catchError( () => of( [] ) )
    );
  }

  searchRegion( term: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${term}`;
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( () => of( [] ) )
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})

//	•	OnInit te da un método (ngOnInit()) para ejecutar código justo cuando Angular ha terminado de configurar tu componente.
//	•	Es el lugar perfecto para inicializar datos o realizar tareas que dependen de que tu componente esté completamente cargado y listo para usarse.
export class CountryPageComponent implements OnInit{

  public country?: Country; // Es de tipo ? null ya que aun no sabemos si viene el pais o no .

  constructor(
    //ActivatedRoute en Angular es un servicio que proporciona acceso a información sobre la ruta que está activa en ese momento.
    //Es decir, te permite acceder a los parámetros que se pasan en la URL y detectar cambios en la ruta actual.
    //Es muy útil cuando necesitas manejar rutas dinámicas o realizar alguna acción en base a los parámetros de la ruta.
    private activateRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ){}
  ngOnInit(): void {

    this.activateRoute.params
      .pipe(//operador pipe
        //operador switchMap es ideal cuando trabajas con flujos rápidos o eventos frecuentes y solo te interesa el último resultado.
        //Es una herramienta poderosa que simplifica el manejo de observables y permite cancelar suscripciones innecesarias,
        //evitando sobrecargar tu aplicación con solicitudes o tareas redundantes.

        //switchMap es ideal para situaciones donde solo el último dato emitido es importante,
        //cancelando automáticamente cualquier proceso anterior para mantener la aplicación rápida y ligera.
        switchMap( ( { id }) => this.countriesService.searchCountryByAlphaCode(id) ),
      )
      .subscribe( country => {
        if( !country ) {
          return this.router.navigateByUrl('');
        }
        return this.country = country;

      })
  }

}

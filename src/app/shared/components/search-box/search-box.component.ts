import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';


@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  /** Subject: Tipo especial de observable se crea manualmente
   * para utilizar elementos de rxjs
  */
  private debouncer: Subject<string> = new Subject<string>();

  //manejo de Ondestroy
  private debouncerSuscription?: Subscription; // no tenemos subcripcion "?"opcinal

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  //mandamos informacion al componente padre
  //By-capital-page con
  //@Output, al agregar EventEmitter asegurate que sea importado
  // de Angular/core
/*   @Output()
  public onValue: EventEmitter<string> = new EventEmitter(); */

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    //Manejo de destruccion de información en debouncer
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    });
  }

  /* Es un metodo que se va a llamar cuando la instancia del coponente
  es destruido */
  /** Que se refiere a destruido, eso significa que al momento de
   * subscribirse la peticiones siguen consumiendo información sin
   * estar en el componente.
   */
  ngOnDestroy(): void {
    /* esto se hace basicamente cuando se hace una subscripcion en
    el  ngOnInit*/
    //ciclo de vida de los componentes
    this.debouncerSuscription?.unsubscribe();

  }

  //@ViewChild('') nos sirve para obtener el texto del
  //input ingresado en el html.
  //@ViewChild('') hace referencia a la caja de texto y la
  // referencia la obtenemos con el #txtInput del html
  //@ViewChild('txtInput')
  //public tagInput!: ElementRef<HTMLInputElement>

 /*  emitValue( value: string ){
    this.onValue.emit(value);
  } */

  onKeyPress( searchTerm: string ){
    this.debouncer.next( searchTerm );
  }
}

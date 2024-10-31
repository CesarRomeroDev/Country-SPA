import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  //mandamos informacion al componente padre
  //By-capital-page con
  //@Output, al agregar EventEmitter asegurate que sea importado
  // de Angular/core
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  //@ViewChild('') nos sirve para obtener el texto del
  //input ingresado en el html.
  //@ViewChild('') hace referencia a la caja de texto y la
  // referencia la obtenemos con el #txtInput del html
  //@ViewChild('txtInput')
  //public tagInput!: ElementRef<HTMLInputElement>

  emitValue( value: string ){
    this.onValue.emit(value);
  }
}

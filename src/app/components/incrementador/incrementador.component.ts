import { Component, OnInit, Input,EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
})
export class IncrementadorComponent implements OnInit {
  @Input('nombre') leyenda: string = 'Leyenda';  
  @Input()  progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter ();
  
  @ViewChild('txtProgress', {static:false}) txtProgress: ElementRef; 

  constructor() { }

  ngOnInit() {
  }

  onChanges (newValor: number) {
    console.log(newValor);
    
    /* let elemHTML: any = document.getElementsByName('progreso')[0]; */
    
    

    if (newValor>=100) {
      this.progreso=100;
    } else if (newValor<=0) {
      this.progreso = 0;
    } else {
      this.progreso = newValor;
    }
     
    /*cambio el valor del input*/
    this.txtProgress.nativeElement.value = this.progreso;
    /*emito el valor*/
    this.cambioValor.emit(this.progreso);
  }

  
  
  cambiarValor (valor: number) {

    if (this.progreso >=100 && valor >0) {
      this.progreso=100;
      return;
    }

    if (this.progreso<=0 && valor < 0) {
      this.progreso = 0;
      return;
    }

     

    this.progreso  = this.progreso + valor;

    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();

  }
}
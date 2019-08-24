import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable()
export class SettingsService {
    
  /* Crea una inferface */
  ajustes: Ajustes  = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

   
  /* Como es inyectado en el componente que arranca la aplicación (app.component) se aplicara altiro el check 
    con el tema que este cargado en local storage */
  constructor(  @Inject(DOCUMENT) private _document) {
    /* Se dispara automaticamente cuando se inyecta en un componente */
    this.cargarAjustes();
   }


  /* Persistencia de los datos del tema en el local storage */
  guardarAjustes() {
 
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));  
  }
  
  /* Funcion para cargar el tema si es que ya habia uno antes  */
  cargarAjustes () {

    /* Si hay un tema en el localstorage, cargara ese tema */
    if (localStorage.getItem('ajustes')) {

      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      
      this.aplicarTema(this.ajustes.tema);

    } else {

      this.aplicarTema(this.ajustes.tema);

    }
  }

  aplicarTema(tema: string) {
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href',url);

    /* accedemos a la propiedad ajustes del servicio para cambiar el tema */
    this.ajustes.tema=tema;
    this.ajustes.temaUrl= url;

    this.guardarAjustes(); /* lo guarda en el localStorage */
  }



}




/* Esto exige el tipo de información que se permitiran en los ajustes */
interface Ajustes {
  temaUrl: string;
  tema: string;
}

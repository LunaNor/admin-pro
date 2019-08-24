import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})

/*ESTE SERVICIO SE IMPORTA EN EL MODULO PRINCIPAL PARA QUE LO OCUPEN TODOS LOS COMPONENTES DE LA APP, ES DECIR
  DE FORMA GLOBAL */
export class AccountSettingsComponent implements OnInit {
  
  
  constructor(public _ajustes: SettingsService) {}

 
  ngOnInit() {
    this.colocarCheck();
  }

  
  /* Función que será llamada desde el html para cambiar el tema, recibe como parametro el tema y el link entero */
  cambiarColor (tema: string, link: any) {

    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);

  }

  aplicarCheck (link: any) {
    /* Arreglo con todas las clases que tengan el nombre selector */
    let selectores: any = document.getElementsByClassName('selector'); 
    
    /* Quitamos el selector actual, si es que lo tiene */
    for (let ref of selectores) {
       ref.classList.remove('working');
    }
    
    link.classList.add('working');
  }

  colocarCheck () {
    /* Arreglo con todas las clases que tengan el nombre selector */
    let selectores: any = document.getElementsByClassName('selector'); 
    let tema = this._ajustes.ajustes.tema;

    for (let ref of selectores) {
      if (ref.getAttribute('data-theme')=== tema) {
        ref.classList.add('working');
        break;
      }
    }

  }

}

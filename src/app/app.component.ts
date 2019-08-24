import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  /* Inyectamos el servicio para cargar los datos del tema del local storage, si es que los hay */
  /* Con solo inyectarlo funciona, ya que el servicio, en su constructor, tiene llama al metodo de cargarAjustes 
      desde el localStorage */
  constructor (public _ajustes: SettingsService) {
  
  }

}

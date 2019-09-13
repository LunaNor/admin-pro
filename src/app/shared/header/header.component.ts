import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  
  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService,
              public router: Router) { }

  ngOnInit() {
    /* capturamos el usuario de la petición hecha por el servicio de usuario */
    this.usuario = this._usuarioService.usuario;
  }

  buscar( termino: string) {
    /* redirecciono al componenten de busqueda */
    this.router.navigate(['/busqueda', termino])
  }

}

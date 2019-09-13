import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor ( 
    public _usuarioService: UsuarioService
  ) {

  }

  canActivate() {
    
    /* si el usuario ingresado es adminrole quiere decir que si puede entrar a esa ruta */
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;  
    } else {
      console.log('Bloqueado por el ADMIN GUARD');
      /* lo redireccionamos al login */
      this._usuarioService.logout();
      return false;
    }

  }
  
}

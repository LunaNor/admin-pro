import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { URL_SERVICIOS } from '../../config/config';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  
  usuario: Usuario;
  /* nececito cargarla esta variable cuando se detecta el cambio en el input file  */
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar ( usuario: Usuario) {
    
    /* Creamos el usuario que posteriormente será enviado a nuestro backend */
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;

    }



    this._usuarioService.actualizarUsuario( this.usuario) 
              .subscribe();

  }

  seleccionImagen( archivo: File) {
    
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    
    /* verificamos que sea una imagen */
    if (archivo.type.indexOf('image') < 0) {
      console.log('Sólo imágenes');/* swal('Solo imágenes','El archivo seleccionado no es una imagen', 'error'); */
      this.imagenSubir = null;
      return;
    } 

    /* Aqui capturamos la imagen  que se quiere subir */
    this.imagenSubir = archivo;


    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo) ; 

    reader.onloadend = () => this.imagenTemp = String(reader.result);
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }

  

}

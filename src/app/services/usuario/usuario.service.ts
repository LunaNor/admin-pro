import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

import { map,catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];
  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivo: SubirArchivoService) {
   this.cargarStorage();

  }

  estaLogueado () {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage () {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }
  

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    /* recibimos el menu segun sea admin o usuario  */
    this.menu = menu;

  }

  logout () {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    
    this.router.navigate(['/login']);

  }

  loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
          .pipe(
            map( (resp:any) => {
              this.guardarStorage(resp.id, resp.token, resp.usuarioDB, resp.menu);
              console.log(resp);
              return true;
            })
          );

  }
  
  login ( usuario: Usuario, recordar: boolean = false ) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
      
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
                .pipe(
                  map( (resp:any) => {
                    
                    this.guardarStorage(resp.id, resp.token, resp.usuarioDB, resp.menu);
                    /* esto cambia la respuesta (el usuario ) a un simple true */
                    return true; 
                  }),
                  /* asi se ocupa ahora el catch, se separa con coma y es catchError */
                  catchError(err => {

                    console.log('ERROR EN EL LOGIN: ', err.error.mensaje);
                    return Observable.throw(err);
                  })


                );



  }




  crearUsuario ( usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    /* regresaremos un observador */
    return this.http.post( url, usuario )
              .pipe(
                map( (resp:any) => {
                  /* swal('Usuario creado', usuario.email, 'success'); */
                  console.log('Usuario creado ');
                  return resp.usuario;
                }),
                catchError(err => {

                  console.log(err.error.mensaje + ' - ' + err.error.errors.message);
                  return Observable.throw(err);
                })
              );

  }


  actualizarUsuario ( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    /* concatenar el token ya que en nuestro backend es una ruta que necesita autenticacion */
    url += '?token=' + this.token;
    

    return this.http.put(url, usuario )
          .pipe(
            map( (resp: any) => {
                
              if (usuario._id === this.usuario._id) {
                this.guardarStorage( resp.usuarioGuardado._id, this.token, resp.usuarioGuardado, this.menu);

              }

              console.log('Usuario Actualizado', resp.usuarioGuardado.nombre, 'success'  );  /* swal('Usuario Actualizado', usuario.nombre, 'sucess'); */
              return true;
            }),
            catchError(err => {

              console.log(err.error.mensaje + ' - ' + err.error.errors.message);
              return Observable.throw(err);
            })
          );

  }
  
  cambiarImagen( archivo: File, id: string) {
    
    this._subirArchivo.subirArchivo(archivo, 'usuarios', id)
          .then ( (resp:any) => {
            /* aqui asignamos la nueva imagen para el usuario, que luego seria enviada */

            this.usuario.img = resp.usuarioActualizado.img;
            console.log('Imagen actualizada'); /* swal('Imagen actualizada', this.usuario.nombre,'success'); */
            this.guardarStorage( id, this.token, this.usuario, this.menu);
          })
          .catch( resp => {
            console.log(resp);
          });

  }


  cargarUsuarios(desde:number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
  
    return this.http.get(url);  

  }

  buscarUsuarios( termino: string) {
 

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
            .pipe(
              map(
                (resp:any) => resp.usuarios
              )
            );
  }

  borrarUsuario ( id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id ;
    url += '?token=' + this.token;

    return this.http.delete( url)
          .pipe (
            map (
              resp => {
                console.log('Usuario Borrado'); /* swal('Usuario borrado, 'El usuario ha sido eliminado correctamente', 'success') */
                return true;
              }
            )
          );
  }
  

}

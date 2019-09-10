import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  
  /* arreglo de usuarios */
  usuarios: Usuario [] = [] ;
  desde: number = 0;
  cargando: boolean = true;

  totalRegistros: number = 0;

  constructor(public _usuariosService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
  
    this._modalUploadService.notificacion
          .subscribe( resp=> this.cargarUsuarios());


  }


  mostrarModal (id: string) {
    this._modalUploadService.mostrarModal('usuarios',id);
  }

  cargarUsuarios() {
  
    this.cargando = true;

    this._usuariosService.cargarUsuarios(this.desde)
            .subscribe( (resp:any) => {
              console.log(resp);

              this.totalRegistros = resp.total;
              this.usuarios = resp.usuarios;
              this.cargando = false;
            });
  }

  cambiarDesde( valor: number ){
    let desde = this.desde + valor;
    console.log(desde);
    
    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor
    this.cargarUsuarios();


  }

  buscarUsuarios (termino: string) {

    if ( termino.length <=0 ) {
      this.cargarUsuarios();
      return;
    }
    
    this.cargando = true;

    this._usuariosService.buscarUsuarios( termino)
          .subscribe ( (usuarios: Usuario[]) =>  {

            /* nuevos usuarios */
            this.usuarios = usuarios;
            this.cargando = false;
          });

  }

  borrarUsuario ( usuario: Usuario) {
    
    /* si se intenta borrarse a si mismo */
    if ( usuario._id === this._usuariosService.usuario._id) {
      console.log('No se puede borrar a si mismo');  /* swal('No se puede borrar usuario','No se puede borrar a si mismo','error'); */
      return;
    }

    /* preguntar si se va borrar con SWEETALERT */

    this._usuariosService.borrarUsuario( usuario._id) 
          .subscribe( borrado => {
            console.log( borrado);
            this.cargarUsuarios();
          });

  }

  guardarUsuario ( usuario: Usuario) {
    this._usuariosService.actualizarUsuario(usuario)
          .subscribe();
  }

}

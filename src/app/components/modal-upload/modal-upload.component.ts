import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUpLoadService: ModalUploadService
  ) {}

  ngOnInit() {
  }


  cerrarModal () {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUpLoadService.ocultarModal();
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


  subirImagen () {
  
    this._subirArchivoService.subirArchivo( this.imagenSubir,this._modalUpLoadService.tipo,this._modalUpLoadService.id)
            .then( resp => {

              console.log(resp);
              /* emito la respueta de la variable event emitter del servicio */
              this._modalUpLoadService.notificacion.emit( resp );
              this.cerrarModal();
            })
            .catch( err => { 
              console.log('Error en la carga...');
            });

  }

}

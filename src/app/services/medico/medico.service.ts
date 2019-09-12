import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0; 

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {

   }


  cargarMedicos () {
     
    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
          .pipe(
            map(
              (resp:any) => {
                this.totalMedicos = resp.total;
                return resp.medicos;
              }
            )
          );

  }

  buscarMedicos( termino: string) {
 

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
            .pipe(
              map(
                (resp:any) => resp.medicos
              )
            );
  }

  borrarMedico ( id: string) {
      
    let url = URL_SERVICIOS + '/medico/'+ id;
    url += '?token='+ this._usuarioService.token;

    return this.http.delete(url)
        .pipe(
          map(
            resp => {
              console.log('Médico borrado');/* swal('Médico borrado', 'Medico borrado correctamente','success'); */
              return resp;
            } 
          )
        );

  }

  cargarMedico ( id: string ){
    
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url) 
      .pipe(
        map(
          (resp:any) => resp.medico
        )
      )
 
  }

  guardarMedico ( medico: Medico ) {
    
    let url = URL_SERVICIOS + '/medico';
  

    /* si viene un id, es porque quiero actualizar */
    if ( medico._id) {
      
      url += '/'+medico._id;
      url += '?token=' + this._usuarioService.token;


      return this.http.put( url, medico)
                .pipe(
                  map (
                    (resp:any) => {
                      console.log('Médico Actualizado');
                      return resp.medicosGuardado;      
                    }
                  )
                );

    } else {
    
      /* sino, estoy creando */
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, medico )
          .pipe(
            map(
              (resp:any) => {
                console.log('Medico creado');
                return resp.medico;
              }
            )
          );
    }


  }


}

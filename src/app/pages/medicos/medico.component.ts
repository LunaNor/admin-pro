import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico ('','','','','');
  hospital: Hospital = new Hospital('');  //variable local para mostrar el hospital


  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService 
  ) { 
    /* OCUPO EL ACTIVATEDROUTE PARA EXTRAER EL ID */
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      
    
      /* CARGO EL MEDICO PARA QUE SE MUESTRE INMEDIATAMENTE */
      if ( id !== 'nuevo'){
        this.cargarMedico(id);
      }


    });
  }

  ngOnInit() {
    /* cargamos los hospitales */
    this._hospitalService.cargarHospitales()
          .subscribe( hospitales => this.hospitales = hospitales);

    this._modalUploadService.notificacion
          .subscribe( resp =>  {
            /* asociamos la imagen para que se muestre una vez que le damos una imagen   */
            this.medico.img = resp.medico.img
          });
  }

  /* CARGAR AL MEDICO LUEGO DE SER CREADO */
  cargarMedico ( id: string) {
      
    this._medicoService.cargarMedico(id)
          .subscribe( medico => {
  
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital( this.medico.hospital);
           });


  }

  /* Recibe un formulario de aproximación por template, que es de tipo NgFomr */
  guardarMedico( f: NgForm) {
    console.log(f.valid); /* si es valido arroja true */
    console.log(f.value); /* muestra el contenido del formulario */

    if ( f.invalid) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
          .subscribe (medico => {
            
            this.medico._id = medico._id;

            this.router.navigate(['/medico', medico._id ])


          });

  }
  
  cambioHospital ( id: string ) {
      
    this._hospitalService.obtenerHospital( id)
          .subscribe( hospital => this.hospital = hospital);


  }

  cambiarFoto () {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }


}

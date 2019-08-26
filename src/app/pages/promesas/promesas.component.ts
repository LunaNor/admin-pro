import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {


  
  constructor() { 
    /* Ejercicio: crear la promesa del video nuevamente */
      
    /* creamos una promesa que recibira como parametro una funcion callback y reject 
       esto es ya que mas adelante podemos llamar a esa promesa y enviarle tales callback, para que estos sean 
         respondidos en la promesa */
    
         /* una vez recibidos los callbacks quiero que ralices lo siguiente => {} */
    

    /* llamada de la promesa */
    /* la llamamos con then para estar escuchando el resolve, que significa que la promesa viene con exito */
    this.contrarTres().then(
      mensaje => console.log('Terminó la promesa',mensaje)
    )
    .catch(error => console.error('Ha lanzado error',error));
    
    


  }

  ngOnInit() {

  }

  contrarTres(): Promise <boolean> {

    let promesa = new Promise <boolean> ((resolve,reject) => {

      let contador = 0;
      
      let intervalo = setInterval(()=> {
      
        contador +=1;
        console.log(contador);

        if (contador===3) {
          resolve(true);
          clearInterval(intervalo);
        }

      },1000);
      

    });

    return promesa;

  }

}

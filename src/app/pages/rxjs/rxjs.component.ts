import { Component, OnInit, OnDestroy } from '@angular/core';


import { Observable, Subscriber, Subscription } from 'rxjs';

import { retry, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {


    /* Ejercicio: Realizar todo el observable hecho en el video  */

    
    
    /* nos suscribimos al observador */
    /* podemos enviar 3 callbacks, y recibir 3 respuestas, de next, de error y de cuando se completo el observable */
    
    /* con retry  */
    //this.regresaObservable() .pipe(
      //retry(2) /* sigue el proceso que se esta ejecutando */
    //)
    //.subscribe( 
      //numero => console.log('Subs',numero),
      //error => console.error('Error en el obs',error),
      //() => console.log('El observador terminó')
    //);

    this.subscription =  this.regresaObservable().subscribe(
      numero => console.log('Subs',numero),
      error => console.error('Error en el obs',error),
      () => console.log('El observador terminó')
    );
    



   }


  regresaObservable (): Observable <any> {

    return new Observable ( (observer: Subscriber<any>) => {
    
      let contador = 0;

      let intervalo = setInterval( () => {
        
        

        contador ++;

        const salida = {
          valor: contador
        }

        /* notificamos al codigo suscrito al observador */  
        observer.next(salida);
        
        //if (contador ===3) {

          /* terminamos el intervalo */
          //clearInterval(intervalo); 
          
          /* terminamos al observador */
          //observer.complete();
        //}

        /* if ( contador === 2 ) { */
          //clearInterval(intervalo); 
          /* si dejaramos esto, mataria al proceso del intervalo, entonces comenzaria el intervalo y el contador
              desde 0. Pero esto continua el proceso del intervalo desde 2, se incrementa el contador a 3 y se completa
              el observador */
          /* observer.error('Auxilio');
        
        } */

      }, 1000);

      
    }).pipe (
      /* si la informacion que consumimos cambia, la podemos cambiar desde aqui. Que es mucho mas eficiente
        que colocarlo en todos los codigos suscritos. En resumen desde aqui mismo se manda la informacion transformada */
      map( resp => resp.valor),
      filter ((valor,index)=> {
        
        if ((valor%2) ===1) {
          //impar
          return true;
        } else {
          //par 
          return false; 
        }
  
      })
    );
      

  }

  ngOnInit() {

  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
    console.log('La pagina se va a cerrar');
  }

}

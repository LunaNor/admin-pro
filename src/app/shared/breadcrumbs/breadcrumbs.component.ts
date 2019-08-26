import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo :string;

  constructor(private router: Router,
              private title: Title,
              private meta: Meta) { 
   
   this.getDataRoute().subscribe( data => {
      console.log(data);
      /* asignaos el valor retornado por el observable */
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this.meta.updateTag(metaTag);

    })
  }

  ngOnInit() {

  }

  getDataRoute () {
     /* events me retorna varias instancias, una de ellas es activationEnd */
     return this.router.events.pipe(
      /* Queremos que solo deje pasar las instancias que pertenezcan a ActivationEnd */
      filter(evento => evento instanceof ActivationEnd),
      /* Luego queremos que en base a esta instancia solo filtre los firstclhild que sean igual a nulo */
      filter ( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      /* Y deje pasar el dato con atributo data */
      map ((evento: ActivationEnd) =>evento.snapshot.data)
      )
  }

}

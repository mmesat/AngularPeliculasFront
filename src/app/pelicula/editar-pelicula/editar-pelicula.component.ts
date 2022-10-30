import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { PeliculaCreacionDTO, PeliculaDTO } from 'src/app/peliculas/peliculas';
import { PeliculasService } from 'src/app/peliculas/peliculas.service';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private peliculasService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  modelo: PeliculaDTO;
  generosNoSeleccionados: MultipleSelectorModel[];
  generosSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  cinesSeleccionados: MultipleSelectorModel[];
  actoresSeleccionados: actorPeliculaDTO[];
  

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.peliculasService.putGet(params.id)
      .subscribe(peliculaPutGet => {
        this.modelo = peliculaPutGet.pelicula;
        this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map(cines => {
          return <MultipleSelectorModel>{llave: cines.id, valor: cines.nombre}
        });
        this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map(cines => {
          return <MultipleSelectorModel>{llave: cines.id, valor: cines.nombre}
        });
        this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(genero => {
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });
        this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(genero => {
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });
        this.actoresSeleccionados = peliculaPutGet.actores;
      })
    })
  }
  guardarCambios(pelicula: PeliculaCreacionDTO){
    this.peliculasService.editar(this.modelo.id,pelicula)
    .subscribe(() => this.router.navigate(['/pelicula/'+ this.modelo.id]))
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { primeraLetraMayuscula } from 'src/app/peliculas/Validadores/primeraLetraMayuscula';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { generoCreacionDTO } from '../generos';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent  {

  errores: string[] = [];
  constructor(private router: Router, private generosService: GenerosService) { }
  
  guardarCambios(genero: generoCreacionDTO){
    this.generosService.crear(genero).subscribe(() => {
      this.router.navigate(['/generos']);
    }, (error) => this.errores = parsearErroresAPI(error));
    
  }
  

}

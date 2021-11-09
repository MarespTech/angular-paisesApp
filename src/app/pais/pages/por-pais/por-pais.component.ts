import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer
    }
  `]
})
export class PorPaisComponent{

  termino            : string = '';
  hayError           : boolean = false;
  paises             : Country[] = [];
  paisesSugeridos    : Country[] = [];
  mostrarSugerencias : boolean = false;

  constructor( private paisService: PaisService) { }

  buscar( termino:string ){
    this.hayError = false;
    this.mostrarSugerencias = false;
    this.termino = termino

    this.paisService.buscarPais(this.termino)
      .subscribe( resp => {
        this.paises = [...resp];
      }, err => {
        this.hayError = true;
        this.paises = [];
      });
  }

  sugerir( termino: string) {
    this.hayError = false;
    this.mostrarSugerencias = true;
    this.termino = termino;
    
    this.paisService.buscarPais( termino )
      .subscribe( 
        paises => this.paisesSugeridos = paises.splice(0,5),
        (error) => this.paisesSugeridos = []
      )
  }

}

import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
    }
  `]
})
export class PorRegionComponent{

  regiones     : string[]  = ['americas', 'africa', 'asia', 'oceania']
  regionActiva : string    = '';
  paises       : Country[] = []

  constructor( private paisService: PaisService) { }

  getCSS( region: string ) {
    return (region === this.regionActiva) 
      ? 'btn btn-primary' 
      : 'btn btn-outline-primary';
  }

  activarRegion( region: string ) {
    this.regionActiva = region;
    this.paisService.buscarRegion(this.regionActiva.slice(0,3))
      .subscribe( resp => {
        this.paises = [...resp];
      }, err => {
        this.paises = [];
      })
  }

}

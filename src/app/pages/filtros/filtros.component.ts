import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultasCuboService } from '../../services/consultas-cubo.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styles: [
  ]
})
export class FiltrosComponent implements OnInit {

  @Input() totalFiltros: number = 1500
  @Input() aniosConcatenados: string ='[Dim Tiempo].[Anio].[1996]'
  @Input() mesesConcatenados: string = '[Dim Tiempo].[Mes Nombre].[December]'
  @Input() anioSelected: string
  @Input() mesSelected: string

  anios$: Observable<any>;;
  meses$: Observable<any>;;
  anioSeleccionado: any={};
  mesSeleccionado: any={};

  constructor(private cuboService: ConsultasCuboService) { }

  ngOnInit(): void {
      //Cargar combos con años y meses
      this.anioSeleccionado=[{anio: '1996'}]
      this.mesSeleccionado=[{mes: 'December'}]
      this.fetchAniosTexto()
      this.fetchMesesTexto()
      this.mesSelected='[December],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]'
      this.anioSelected='[1996],[0],[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
  }

  anio_OnChange($event){

    if (this.anioSeleccionado.length===3){
      this.anioSelected='[' + this.anioSeleccionado[0].anio + '],' + '[' + this.anioSeleccionado[1].anio + '],' + '[' + this.anioSeleccionado[2].anio + ']'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.anioSeleccionado.length===2){
      this.anioSelected='[' + this.anioSeleccionado[0].anio + '],' + '[' + this.anioSeleccionado[1].anio + '],' + '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.anioSeleccionado.length===1){
      this.anioSelected='[' + this.anioSeleccionado[0].anio + '],' + '[0],' + '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
  }

  mes_OnChange($event){
    if (this.mesSeleccionado.length===12){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[' + this.mesSeleccionado[2].mes + '],' + '[' + this.mesSeleccionado[3].mes + '],' + '[' + this.mesSeleccionado[4].mes + '],' + '[' + this.mesSeleccionado[5].mes + '],' + '[' + this.mesSeleccionado[6].mes + '],' + '[' + this.mesSeleccionado[7].mes + '],' + '[' + this.mesSeleccionado[8].mes + '],' + '[' + this.mesSeleccionado[9].mes + '],' + '[' + this.mesSeleccionado[10].mes + '],' + '[' + this.mesSeleccionado[11].mes + ']'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===11){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[' + this.mesSeleccionado[2].mes + '],' + '[' + this.mesSeleccionado[3].mes + '],' + '[' + this.mesSeleccionado[4].mes + '],' + '[' + this.mesSeleccionado[5].mes + '],' + '[' + this.mesSeleccionado[6].mes + '],' + '[' + this.mesSeleccionado[7].mes + '],' + '[' + this.mesSeleccionado[8].mes + '],' + '[' + this.mesSeleccionado[9].mes + '],' + '[' + this.mesSeleccionado[10].mes + '],' + '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===10){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[' + this.mesSeleccionado[2].mes + '],' + '[' + this.mesSeleccionado[3].mes + '],' + '[' + this.mesSeleccionado[4].mes + '],' + '[' + this.mesSeleccionado[5].mes + '],' + '[' + this.mesSeleccionado[6].mes + '],' + '[' + this.mesSeleccionado[7].mes + '],' + '[' + this.mesSeleccionado[8].mes + '],' + '[' + this.mesSeleccionado[9].mes + '],' + '[0],' + '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===9){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[' + this.mesSeleccionado[2].mes + '],' + '[' + this.mesSeleccionado[3].mes + '],' + '[' + this.mesSeleccionado[4].mes + '],' + '[' + this.mesSeleccionado[5].mes + '],' + '[' + this.mesSeleccionado[6].mes + '],' + '[' + this.mesSeleccionado[7].mes + '],' + '[' + this.mesSeleccionado[8].mes + '],' + '[0],' + '[0],' + '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===8){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[' + this.mesSeleccionado[2].mes + '],' + '[' + this.mesSeleccionado[3].mes + '],' + '[' + this.mesSeleccionado[4].mes + '],' + '[' + this.mesSeleccionado[5].mes + '],' + '[' + this.mesSeleccionado[6].mes + '],' + '[' + this.mesSeleccionado[7].mes + '],' + '[0],' + '[0],' + '[0],' + '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===7){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[' + this.mesSeleccionado[2].mes + '],' + '[' + this.mesSeleccionado[3].mes + '],' + '[' + this.mesSeleccionado[4].mes + '],' + '[' + this.mesSeleccionado[5].mes + '],' + '[' + this.mesSeleccionado[6].mes + '],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===6){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[' + this.mesSeleccionado[2].mes + '],' + '[' + this.mesSeleccionado[3].mes + '],' + '[' + this.mesSeleccionado[4].mes + '],' + '[' + this.mesSeleccionado[5].mes + '],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===5){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[' + this.mesSeleccionado[2].mes + '],' + '[' + this.mesSeleccionado[3].mes + '],' + '[' + this.mesSeleccionado[4].mes + '],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===5){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[' + this.mesSeleccionado[2].mes + '],' + '[' + this.mesSeleccionado[3].mes + '],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===4){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[' + this.mesSeleccionado[2].mes + '],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===3){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[' + this.mesSeleccionado[2].mes + '],' + '[0],' + '[0],' + '[0],'+ '[0],'+ '[0],'+ '[0],'+ '[0],'+ '[0],'+ '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===2){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[' + this.mesSeleccionado[1].mes + '],' + '[0],' + '[0],' + '[0],' + '[0],'+ '[0],'+ '[0],'+ '[0],'+ '[0],'+ '[0],'+ '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
    if (this.mesSeleccionado.length===1){
      this.mesSelected='[' + this.mesSeleccionado[0].mes + '],' + '[0],' + '[0],' + '[0],' + '[0],' + '[0],'+ '[0],'+ '[0],'+ '[0],'+ '[0],'+ '[0],'+ '[0]'
      this.fetchFiltroAnio(this.mesSelected, this.anioSelected)
    }
  }

  fetchFiltroAnio(mes: string, anio: string){
    this.cuboService.getPruebaFiltros(mes, anio).subscribe((result: any) => {
      let ventasFiltroMultiple
      ventasFiltroMultiple=result.ventasT
      this.totalFiltros=ventasFiltroMultiple
      console.log ("Años filtrados", ventasFiltroMultiple)
      return ventasFiltroMultiple
    })
  }

  fetchAniosTexto(){
    this.anios$=this.cuboService.getAniosTexto();
  }

  fetchMesesTexto(){
    this.meses$=this.cuboService.getSoloMeses();
  }

}

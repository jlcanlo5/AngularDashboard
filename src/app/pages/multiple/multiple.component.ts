import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultasCuboService } from '../../services/consultas-cubo.service';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styles: [
  ]
})
export class MultipleComponent implements OnInit {

  @Input() totalFiltros: number = 1500
  @Input() aniosConcatenados: string ='[Dim Tiempo].[Anio].[1996]'
  @Input() mesesConcatenados: string = '[Dim Tiempo].[Mes Nombre].[December]'

  anios$: Observable<any>;;
  meses$: Observable<any>;;
  anioSeleccionado: any={};
  mesSeleccionado: any={};

  constructor(private cuboService: ConsultasCuboService) { }

  ngOnInit(): void {

    this.fetchQuery()
    //Cargar combos con años y meses
    this.anioSeleccionado=[{anio: '1996'}]
    this.mesSeleccionado=[{mes: 'December'}]
    this.fetchAniosTexto()
    this.fetchMesesTexto()
    this.fetchFiltroAnio(this.mesesConcatenados, this.aniosConcatenados)
  }

  anio_OnChange($event){
    let j
    let numeros=''
    for (j in this.anioSeleccionado){
      numeros = numeros + '[Dim Tiempo].[Anio].[' + this.anioSeleccionado[j].anio + '],'
    }
    this.aniosConcatenados= numeros.slice(0, -1);
    console.log(numeros, "Asi queda anios", this.aniosConcatenados)
    this.fetchFiltroAnio(this.mesesConcatenados, this.aniosConcatenados)
  }

  mes_OnChange($event){
    let j
    let meses=''
    for (j in this.mesSeleccionado){
      meses = meses + '[Dim Tiempo].[Mes Nombre].[' + this.mesSeleccionado[j].mes + '],'
    }
    this.mesesConcatenados= meses.slice(0, -1);
    console.log(meses, "Asi queda meses", this.mesesConcatenados)
    this.fetchFiltroAnio(this.mesesConcatenados, this.aniosConcatenados)
  }

  fetchFiltroAnio(mes: string, anio: string){
    this.cuboService.getFiltrosAnioMes(mes, anio).subscribe((result: any) => {
      let ventasFiltroMultiple
      ventasFiltroMultiple=result.salesFilter
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

  fetchQuery(){
    let mquery
    mquery='SELECT NON EMPTY { [Measures].[Fact Ventas KPI Ventas Con Descuento] } ON COLUMNS, NON EMPTY { ([Dim Tiempo].[Anio].[Anio].ALLMEMBERS * [Dim Tiempo].[Mes Nombre].[Mes Nombre].ALLMEMBERS ) } ON ROWS FROM [DWH Northwind]'
    this.cuboService.getQueryCompleto(mquery).subscribe((result: any) => {
      let ventasFiltroMultiple
      ventasFiltroMultiple=result.ventasT
      console.log ("Resultado query completo", ventasFiltroMultiple)
    })
  }

}

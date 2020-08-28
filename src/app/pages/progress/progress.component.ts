import { Component, OnInit, Input, Output } from '@angular/core';
import { ConsultasCuboService } from '../../services/consultas-cubo.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})

export class ProgressComponent implements OnInit {

  @Input() totalVentas: string = '1';
  @Input() ventasMesAnio1: string = '155';
  @Input() ventasMesAnio2: string = '175';
  @Input() labelMesAnio1: string = 'July 1996'
  @Input() labelMesAnio2: string = 'May 1998'
  @Input() aniosFiltros: any = "prueba"


  //Nuestro servicio se está inyectando como dependencia en el componente
  constructor(private cuboService: ConsultasCuboService){
    this.fetchMeses()
  }

  mesAnio1$: Observable<any>;
  mesAnio2$: Observable<any>;

  mes1Seleccionado: any={};
  anio1Seleccionado: any={};
  mes2Seleccionado: any={};
  anio2Seleccionado: any={};

  anioFiltro$: Observable<any>;
  anioFiltroSeleccionado: any={};

  ngOnInit(){

    //Para card de mesAnio1
    this.mes1Seleccionado={
      mes:'May',
      anio:'1998',
      descripcion: 'May 1998'
    }

    this.mes2Seleccionado={
      mes:'July',
      anio:'1996',
      descripcion: 'July 1996'
    }

    //Para combo y filtros de año múltiple
    this.anioFiltroSeleccionado=[{anio: '1996'}]

    this.fetchVentasTotales()
    this.fetchMesAnio1(this.mes1Seleccionado.mes, this.mes1Seleccionado.anio)
    this.fetchMesAnio2(this.mes2Seleccionado.mes, this.mes2Seleccionado.anio)
    this.fetchFiltroMultiple()
    //this.fetchFiltroAnio(this.anioFiltroSeleccionado.anio, this.anioFiltroSeleccionado.anio, this.anioFiltroSeleccionado.anio)
    this.fetchFiltroAnio('1996','0','0')
  }

  mesAnio1_OnChange($event){
    this.fetchMesAnio1(this.mes1Seleccionado.mes, this.mes1Seleccionado.anio)    
  }

  mesAnio2_OnChange($event){
    this.fetchMesAnio2(this.mes2Seleccionado.mes, this.mes2Seleccionado.anio)
  }

  dimension_OnClear($event){

  }

  anioFiltro_onChange($event){
    //this.fetchFiltroAnio(this.anioFiltroSeleccionado.anio[0], this.anioFiltroSeleccionado.anio[1], this.anioFiltroSeleccionado.anio[2] )
    console.log("Array temporal años multiple", this.anioFiltroSeleccionado)
    if (this.anioFiltroSeleccionado.length===3){
      this.fetchFiltroAnio(this.anioFiltroSeleccionado[0].anio, this.anioFiltroSeleccionado[1].anio, this.anioFiltroSeleccionado[2].anio)
    }
    if (this.anioFiltroSeleccionado.length===2){
      this.fetchFiltroAnio(this.anioFiltroSeleccionado[0].anio, this.anioFiltroSeleccionado[1].anio, '0')
    }
    if (this.anioFiltroSeleccionado.length===1){
      this.fetchFiltroAnio(this.anioFiltroSeleccionado[0].anio, '0', '0')
    }
    if (this.anioFiltroSeleccionado.length===0){
      this.fetchFiltroAnio('0', '0', '0')
    }
    
  }

  fetchVentasTotales(){
    this.cuboService.getVentasTotales().subscribe((result: any) => {
      let ventas
      ventas=result.ventasT
      this.totalVentas='$' + ventas
      return ventas
    })
  }

  fetchMesAnio1(mes: string, anio: string){
    this.cuboService.getVentasPorMes(mes, anio).subscribe((result: any) => {
      let ventasMesAnio
      ventasMesAnio=result.ventasAnio
      this.ventasMesAnio1='$' + ventasMesAnio
      this.labelMesAnio1=(this.mes1Seleccionado.descripcion)
      return ventasMesAnio
    })
  }

  fetchMesAnio2(mes: string, anio: string){
    this.cuboService.getVentasPorMes(mes, anio).subscribe((result: any) => {
      let ventasMesAnio
      ventasMesAnio=result.ventasAnio
      this.ventasMesAnio2='$' + ventasMesAnio
      this.labelMesAnio2=(this.mes2Seleccionado.descripcion)
      return ventasMesAnio
    })
  }

  fetchFiltroAnio(anio1: string, anio2: string, anio3:string){
    this.cuboService.getFiltrosAnio(anio1, anio2, anio3).subscribe((result: any) => {
      let ventasFiltroMultiple
      ventasFiltroMultiple=result.anio
      this.aniosFiltros=ventasFiltroMultiple
      console.log ("Años filtrados", ventasFiltroMultiple)
      return ventasFiltroMultiple
    })
  }

  fetchFiltroMultiple(){
    this.anioFiltro$=this.cuboService.getAniosTexto();
  }

  fetchMeses(){
    this.mesAnio1$=this.cuboService.getMesesTexto();
    this.mesAnio2$=this.cuboService.getMesesTexto();
  }
}

import { Component, OnInit, Input, Output } from '@angular/core';
import { ConsultasCuboService } from '../../services/consultas-cubo.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Charts
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

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

  //Inicia combo de selección múltiple


//Inicia gráfica
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  //Nuestro servicio se está inyectando como dependencia en el componente
  constructor(private cuboService: ConsultasCuboService){
    this.fetchDimensions()
    this.fetchTops()
    this.fetchMeses()
  }

  dimension$: Observable<any>;
  top$: Observable<any>;
  mesAnio1$: Observable<any>;
  mesAnio2$: Observable<any>;

  mes1Seleccionado: any={};
  anio1Seleccionado: any={};
  mes2Seleccionado: any={};
  anio2Seleccionado: any={};

  anioFiltro$: Observable<any>;
  anioFiltroSeleccionado: any={};

  dimensionSelected: any = {};
  topSelected: any = {};

  ngOnInit(){

    //Para gráfica de TopN
    this.dimensionSelected={
      codigo:1,
      descripcion: 'Clientes',
      valor:"[Dim Clientes].[Dim Clientes Compania]"
    }

    this.topSelected={
      value:3,
      label:'Top 3'
    }

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

    this.fetchCharts(this.topSelected.value, this.dimensionSelected.valor)
    this.fetchVentasTotales()
    this.fetchMesAnio1(this.mes1Seleccionado.mes, this.mes1Seleccionado.anio)
    this.fetchMesAnio2(this.mes2Seleccionado.mes, this.mes2Seleccionado.anio)
    this.fetchFiltroMultiple()
    //this.fetchFiltroAnio(this.anioFiltroSeleccionado.anio, this.anioFiltroSeleccionado.anio, this.anioFiltroSeleccionado.anio)
    this.fetchFiltroAnio('1996','0','0')
  }

  dimension_OnChange($event){
    this.fetchCharts(this.topSelected.value, this.dimensionSelected.valor)
  }

  dimension_OnClear($event){

  }

  top_OnChange($event){
    this.fetchCharts(this.topSelected.value, this.dimensionSelected.valor)
  }

  top_OnClear($event){

  }

  mesAnio1_OnChange($event){
    this.fetchMesAnio1(this.mes1Seleccionado.mes, this.mes1Seleccionado.anio)    
  }

  mesAnio2_OnChange($event){
    this.fetchMesAnio2(this.mes2Seleccionado.mes, this.mes2Seleccionado.anio)
  }

  anioFiltro_onChange($event){
    //this.fetchFiltroAnio(this.anioFiltroSeleccionado.anio[0], this.anioFiltroSeleccionado.anio[1], this.anioFiltroSeleccionado.anio[2] )
    console.log("Array temporal", this.anioFiltroSeleccionado)
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

  fetchCharts(topValue: number, dimensionValue: string){
    this.cuboService.getDataTopN(topValue, dimensionValue, 'DESC').subscribe((result: any) => {
      console.log('LLAMADA A API NORTHWIND ---> ', result)
      /*let arrayTmp: any[]=[]
      result.dimension.forEach(item => {
        arrayTmp.push()
      });*/

      this.barChartLabels=result.dimension;

      this.barChartData = [
        {data: result.anios1, label: '1996'},
        {data: result.anios2, label: '1997'},
        {data: result.anios3, label: '1998'}
      ];
    });
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

  fetchDimensions(){
    this.dimension$=this.cuboService.getDimensions();
  }

  fetchTops(){
    this.top$=this.cuboService.getTops();
  }

  fetchMeses(){
    this.mesAnio1$=this.cuboService.getMesesTexto();
    this.mesAnio2$=this.cuboService.getMesesTexto();
  }
}

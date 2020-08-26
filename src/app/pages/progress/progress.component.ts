import { Component, OnInit, Input, Output } from '@angular/core';
import { ConsultasCuboService } from '../../services/consultas-cubo.service'
import { Observable } from 'rxjs';

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
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [];

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
      descripcion: 'Mayo 1998'
    }

    this.mes2Seleccionado={
      mes:'July',
      anio:'1996',
      descripcion: 'July 1996'
    }
    this.fetchCharts(this.topSelected.value, this.dimensionSelected.valor)
    this.fetchVentasTotales()
    this.fetchMesAnio1(this.mes1Seleccionado.mes, this.mes1Seleccionado.anio)
    this.fetchMesAnio2(this.mes2Seleccionado.mes, this.mes2Seleccionado.anio)
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

  fetchCharts(topValue: number, dimensionValue: string){
    this.cuboService.getDataTopN(topValue, dimensionValue, 'DESC').subscribe((result: any) => {
      console.log('LLAMADA A API NORTHWIND ---> ', result)
      console.log("Valor del combo", topValue, dimensionValue)
      let arrayTmp: any[]=[]
      result.dimension.forEach(item => {
        arrayTmp.push()
        
      });

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

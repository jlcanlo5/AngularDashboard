import { Component, OnInit, Input } from '@angular/core';
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

  @Input() title: string = '19985';

//Llenar label Top
/*defaultTopList = [
  { value: 3, label: 'Top 3' },
  { value: 5, label: 'Top 5' },
  { value: 10, label: 'Top 10'}
];

selectedTop = null;*/

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
  }

  dimension$: Observable<any>;
  top$: Observable<any>;
  dimensionSelected: any = {};
  topSelected: any = {};

  ngOnInit(){

    this.dimensionSelected={
      codigo:1,
      descripcion: 'Clientes',
      valor:"[Dim Clientes].[Dim Clientes Compania]"
    }

    this.topSelected={
      value:3,
      label:'Top 3'
    }
    this.fetchCharts(this.topSelected.value, this.dimensionSelected.valor)
    this.fetchVentasTotales()
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
      console.log ("Resultado de ventas", ventas)
      return ventas
    })
  }

  fetchDimensions(){
    this.dimension$=this.cuboService.getDimensions();
  }

  fetchTops(){
    this.top$=this.cuboService.getTops();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}

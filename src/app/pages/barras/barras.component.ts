import { Component, OnInit, Input, Output } from '@angular/core';
import { ConsultasCuboService } from '../../services/consultas-cubo.service'
import { Observable } from 'rxjs';

//Charts
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styles: [
  ]
})
export class BarrasComponent implements OnInit {

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

  constructor(private cuboService: ConsultasCuboService) {
    this.fetchDimensions()
    this.fetchTops()
   }

   dimension$: Observable<any>;
   top$: Observable<any>; 
   dimensionSelected: any = {};
   topSelected: any = {};

  ngOnInit(): void {
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
        this.fetchCharts(this.topSelected.value, this.dimensionSelected.valor)
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
      console.log('Resultados de TopN ', result)

      this.barChartLabels=result.dimension;

      this.barChartData = [
        {data: result.anios1, label: '1996'},
        {data: result.anios2, label: '1997'},
        {data: result.anios3, label: '1998'}
      ];
    });
  }

  fetchDimensions(){
    this.dimension$=this.cuboService.getDimensions();
  }

  fetchTops(){
    this.top$=this.cuboService.getTops();
  }

}

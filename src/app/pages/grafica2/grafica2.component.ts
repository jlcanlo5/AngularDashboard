import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ConsultasCuboService } from '../../services/consultas-cubo.service'

@Component({
  selector: 'app-grafica2',
  templateUrl: './grafica2.component.html',
  styles: [
  ]
})
export class Grafica2Component implements OnInit {

// Pie
public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};
public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
public pieChartData: number[] = [300, 500, 100];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [pluginDataLabels];
public pieChartColors = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  },
];

constructor(private cuboService: ConsultasCuboService) { }

ngOnInit() {
  this.fetchCharts()
}

fetchCharts(){
  this.cuboService.getDataTopN(3, '[Dim Producto].[Dim Producto Nombre]', 'DESC').subscribe((result: any) => {
    console.log("Top 3 productos: ", result.datos)
    this.pieChartLabels=result.dimension;

    this.pieChartData = [
      result.medicion
    ];
  });
}

// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}
}

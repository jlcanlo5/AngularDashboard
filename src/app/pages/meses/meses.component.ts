import { Component, OnInit, Input } from '@angular/core';
import { ConsultasCuboService } from '../../services/consultas-cubo.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meses',
  templateUrl: './meses.component.html',
  styles: [
  ]
})
export class MesesComponent implements OnInit {

  @Input() ventasMesAnio1: string = '155';
  @Input() labelMesAnio1: string = 'July 1996'

  constructor(private cuboService: ConsultasCuboService) {
    this.fetchMeses()
   }

   mesAnio1$: Observable<any>;

 
   mes1Seleccionado: any={};
   anio1Seleccionado: any={};


  ngOnInit(): void {
    this.mes1Seleccionado={
      mes:'May',
      anio:'1998',
      descripcion: 'May 1998'}

      this.fetchMesAnio1(this.mes1Seleccionado.mes, this.mes1Seleccionado.anio)
    
  }

  mesAnio1_OnChange($event){
    this.fetchMesAnio1(this.mes1Seleccionado.mes, this.mes1Seleccionado.anio)    
  }

  dimension_OnClear($event){

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

  fetchMeses(){
    this.mesAnio1$=this.cuboService.getMesesTexto();
  }

}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const URL_BASE = environment.ENDPOINTS.CUBO.urlBase;

@Injectable({
  providedIn: 'root'
})
export class ConsultasCuboService {

  constructor(private http: HttpClient) { }

  getDataTopN(topN: number, dimension: string, order: string){
    //La API puede devolver muchos datos que tal vez no son relevantes, con el pipe se filtra y se devuelve en Angular
    //aquel nodo que se requiere. Solo es para utilizar el segmento de los resultados de la API
    return this.http.get(`${URL_BASE}/TopN/${topN}/${dimension}/${order}`);
  }

  getDimensions(){
    return this.http.get('assets/json/dimensions.json');
  }

  getTops(){
    return this.http.get('assets/json/seleccionarTop.json');
  }

  getVentasTotales(){
    return this.http.get(`${URL_BASE}/ventas/TotalVentas`);
  }

  getVentasPorAnio(){
    return this.http.get(`${URL_BASE}/ventas/porAnio`);
  }

  getVentasPorMes(mes: string, anio: string){
    return this.http.get(`${URL_BASE}/VentasAnios/[${mes}]/[${anio}]`);
  }

  getMesesTexto(){
    //return this.http.get(`${URL_BASE}/ventas/AniosMeses`);
    return this.http.get('assets/json/meses.json');
  }

  getAniosTexto(){
    return this.http.get('assets/json/anios.json');
  }

  getFiltrosAnio(anio1: string, anio2: string, anio3: string){
    return this.http.get(`${URL_BASE}/VentasAnios/[${anio1}],[${anio2}],[${anio3}]`)
  }

  getSoloMeses(){
    return this.http.get('assets/json/soloMeses.json')
  }

  getFiltrosAnioMes(mes: string, anio: string){
    return this.http.get(`${URL_BASE}totalFiltros/ventas/${mes}/${anio}`)
  }

  getPruebaFiltros(mes: string, anio: string){
    return this.http.get(`${URL_BASE}ventasPrueba/filtros/${mes}/${anio}`)
  }

  getQueryCompleto(mQuery: string){
    return this.http.get(`${URL_BASE}query/${mQuery}`)
  }
   
}

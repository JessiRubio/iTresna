import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspaciosItem } from '../clases/espaciosItem';
import * as data from '../server-config.json';


@Injectable({
  providedIn: 'root'
})
export class EspaciosService {

  private url=data.domain+"espacios/";

  constructor(private httpClient:HttpClient) { }

  getEspacios(cod_org:number):Observable<any>{
    return this.httpClient.get<any>(this.url+'?cod_org='+cod_org);
  }
  getEspacio(cod_org:number,cod_esp:number):Observable<any>{
    return this.httpClient.get<any>(this.url+'?cod_org='+cod_org+'&cod_esp='+cod_esp);
  }

  updateEspacio(item:EspaciosItem):Observable<any>{
    var JSON={
      "cod_org":item.cod_org,
      "cod_esp":item.cod_esp,
      "desc_esp":item.desc_esp,
      "ind_esp_curacion":item.ind_esp_curacion,
      "orden":item.orden
    };
    return this.httpClient.put<any>(this.url,JSON);
  }
  addEspacio(item:EspaciosItem):Observable<any>{
    var JSON={
      "cod_org":item.cod_org,
      "cod_esp":item.cod_esp,
      "desc_esp":item.desc_esp,
      "ind_esp_curacion":item.ind_esp_curacion,
      "orden":item.orden
    };
    console.log(JSON);
    return this.httpClient.post<any>(this.url,JSON);
  }
  deleteEspacio(cod_org:number,cod_esp:number):Observable<any>{
    return this.httpClient.delete(this.url+"?cod_org="+cod_org+"&cod_esp="+cod_esp);
  }
}

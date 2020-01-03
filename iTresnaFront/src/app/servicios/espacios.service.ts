import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspaciosItem } from '../clases/espaciosItem';


@Injectable({
  providedIn: 'root'
})
export class EspaciosService {

  ind_esp_curacion:number;
  private url="http://localhost:8080/espacios/";

  constructor(private httpClient:HttpClient) { }

  getEspacios(cod_org:number):Observable<any>{
    return this.httpClient.get<any>(this.url+'?cod_org='+cod_org);
  }
  getEspacio(cod_org:number,cod_esp:number){
    return this.httpClient.get<any>(this.url+'?cod_org='+cod_org+'&cod_esp='+cod_esp);
  }

  updateEspacio(item:EspaciosItem){
    if(item.ind_esp_curacion){
      this.ind_esp_curacion = 1;
    }
    else{
      this.ind_esp_curacion = 0;
    }
    var JSON={
      "cod_org":item.cod_org,
      "cod_esp":item.cod_esp,
      "desc_esp":item.desc_esp,
      "ind_esp_curacion":this.ind_esp_curacion,
      "orden":item.orden
    };
    return this.httpClient.put<any>(this.url,JSON);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as data from '../server-config.json';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {

  private url=data.domain+"clasificacion/";
  constructor(private httpClient:HttpClient,private http:HttpClient) { }

  deleteCategoria(cod_org:number,cod_tip:number,categoria:string):Observable<any>{
    return this.httpClient.delete(this.url+"?cod_org="+cod_org
                                  +"&cod_tip="+cod_tip
                                  +"&categoria="+categoria);
  }

  modificarCategoria(cod_org:number,cod_tip:number,categoria:string):Observable<any>{
    return this.httpClient.get(this.url+"?cod_org="+cod_org
                                  +"&cod_tip="+cod_tip
                                  +"&categoria="+categoria);
  }

  anadirCategoria(cod_org:number,cod_tip:number,categoria:string):Observable<any>{
    var clasificacion ={
      "cod_org":cod_org,
      "cod_tip":cod_tip,
      "categoria":categoria
    }
    return this.httpClient.post(this.url,categoria);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {

  private url="http://127.0.0.1:8080/clasificacion/";
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
   return;
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

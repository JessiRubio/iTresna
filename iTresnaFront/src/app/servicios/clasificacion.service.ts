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

  modificarCategoria(cod_org:number,clasificacion:string,categoriaVieja:string,categoriaNueva:string):Observable<any>{
<<<<<<< HEAD
    let json ={
=======
    var json ={
>>>>>>> 0fb158a6cc33decf3a2e3116839d088798315123
      "cod_org":cod_org,
      "clasificacion":clasificacion,
      "categoriaVieja":categoriaVieja,
      "categoriaNueva":categoriaNueva
    }
<<<<<<< HEAD
    console.log(json);
=======
>>>>>>> 0fb158a6cc33decf3a2e3116839d088798315123
    return this.httpClient.put(this.url,json);
  }

  anadirCategoria(cod_org:number,tip_clasificacion:string,categoria:string):Observable<any>{
    let json ={
      "accion":"añadir Categoria",
      "cod_org":cod_org,
      "tip_clasificacion":tip_clasificacion,
      "categoria":categoria
    }
    return this.httpClient.post(this.url,json);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as data from '../server-config.json';

@Injectable({
  providedIn: 'root'
})

export class ClasificacionService {

  private url=data.domain+"/clasificacion/";
  constructor(private httpClient:HttpClient,private http:HttpClient) { }

  deleteCategoria(cod_org:number,tip_clasificacion:string,categoria:string):Observable<any>{
    return this.httpClient.delete(this.url+"?cod_org="+cod_org
                                  +"&tip_clasificacion="+tip_clasificacion
                                  +"&categoria="+categoria);
  }

  modificarCategoria(cod_org:number,clasificacion:string,categoriaVieja:string,categoriaNueva:string):Observable<any>{
    var json ={
      "accion":"Modificar Categoria",
      "cod_org":cod_org,
      "clasificacion":clasificacion,
      "categoriaVieja":categoriaVieja,
      "categoriaNueva":categoriaNueva
    }
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

  actualizarClasifOrg(cod_org:number,clasifAntiguo:string,clasifNuevo:string):Observable<any>{
    var json = {
      "accion":"modificar clasificacion",
      "cod_org":cod_org,
      "clasifAntiguo":clasifAntiguo,
      "clasifNuevo":clasifNuevo
    }
    
    return this.httpClient.put(this.url,json);
  }
  nuevoClasiOrg(cod_org:number,clasif:string):Observable<any>{
    var json={
      "accion":"nueva_clasificacion",
      "cod_org":cod_org,
      "clasificacion":clasif
    };
    return this.httpClient.post(this.url,json);
  }
  borrarCampo(cod_org:number,clasificacion:string):Observable<any>{
    return this.httpClient.delete(this.url+"?cod_org="+cod_org
                                  +"&clasificacion="+clasificacion);
  }

}

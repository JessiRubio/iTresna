import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CopsService {

  private url="http://itresna.fptxurdinaga.in/cops/";

  constructor(private httpClient:HttpClient) {}

  getCops(cod_org:number,cod_esp:number,cod_usuario:string):Observable<any>{
    return this.httpClient.get(this.url+'?cod_org='+cod_org+'&cod_esp='+cod_esp+'&cod_usuario='+cod_usuario);
  }
  getCop(cod_org:number,cod_esp:number,cod_cop:number):Observable<any>{
    return this.httpClient.get(this.url+'?cod_org='+cod_org+'&cod_esp='+cod_esp+'&cod_cop='+cod_cop);
  }

  getCopsAdministracion(cod_org:number):Observable<any>{
    return this.httpClient.get(this.url+ '?cod_org=' +cod_org);
  }
  modificarCop(cod_org:number,cod_esp:number,cod_cop:number,desc:string,imagen:string):Observable<any>{
    
    let json={
      "cod_org":cod_org,
      "cod_esp":cod_esp,
      "cod_cop":cod_cop,
      "desc_cop":desc,
      "image":imagen
    };  
    return this.httpClient.put(this.url,json);
  }

  modificarEtiqueta(desc_etiqueta:string,cod_etiqueta:number):Observable<any>{
    
    let json={
      "desc_etiqueta":desc_etiqueta,
      "cod_etiqueta":cod_etiqueta
      
     
    };  
    return this.httpClient.put(this.url,json);
  }


  eliminarEtiqueta(cod_etiqueta:number, desc_etiqueta:string):Observable<any>{
    return this.httpClient.delete(this.url+"?cod_etiqueta="+cod_etiqueta
                                  +"&desc_etiqueta="+desc_etiqueta);
  }

  nuevaEtiqueta(cod_cop:number,cod_esp:number,cod_org:number,desc_etiqueta:string):Observable<any>{
    let json={
      "accion":"nueva_etiqueta",
      "cod_cop":cod_cop,
      "cod_esp":cod_esp,
      "cod_org":cod_org,
      "desc_etiqueta":desc_etiqueta
    };  
    return this.httpClient.post(this.url,json);
  }



  nuevaCop(cod_org:number,cod_esp:number,desc:string,imagen:string):Observable<any>{
    let json={
      "accion":"nueva_cop",
      "cod_org":cod_org,
      "cod_esp":cod_esp,
      "desc_cop":desc,
      "image":imagen
    };  
    return this.httpClient.post(this.url,json);
  }
  eliminarCop(cod_org:number, cod_esp:number,cod_cop:number):Observable<any>{
    return this.httpClient.delete(this.url+"?cod_org="+cod_org
                                  +"&cod_esp="+cod_esp
                                  +"&cod_cop="+cod_cop);
  }



}

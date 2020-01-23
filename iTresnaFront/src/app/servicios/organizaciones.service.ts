import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organizacion } from '../clases/organizacion';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionesService {

  private url="http://localhost:8080/organizaciones/";

  constructor(private httpClient:HttpClient) { }

  getOrganizaciones():Observable<any>{
    return this.httpClient.get<any>(this.url);
  }

  getOrganizacionActual(cod_org:number):Observable<any>{
    return this.httpClient.get<any>(this.url+'?cod_org='+cod_org);
  }
  eliminarOrganizacion(cod_org:number):Observable<any>{
    return this.httpClient.delete(this.url+"?cod_org="+cod_org);
  }
  nuevaOrgnizacion(nombre:string,descripcion:string,enlace:string,imagen:string):Observable<any>{
    let json={
      "accion":"nuevaOrganizacion",
      "desc_org":nombre,
      "eslogan":descripcion,
      "imagen":imagen,
      "enlace":enlace
    };
    return this.httpClient.post<any>(this.url,json);
  }
  modificarOrganizacion(cod_org,desc_org,eslogan,contacto,enlace,imagen):Observable<any>{
    let json={
      "cod_org":cod_org,
      "desc_org":desc_org,
      "eslogan":eslogan,
      "imagen":imagen,
      "contacto":contacto,
      "enlace":enlace
    };
    return this.httpClient.put<any>(this.url,json);
  }

  actualizarCamposClasifOrg(org:Organizacion):Observable<any>{
    let json={
      "accion":"CamposClasif",
        "cod_org":org.cod_org,
        "clasif1":org.clasif1,
        "clasif2":org.clasif2,
        "clasif3":org.clasif3
    };
    return this.httpClient.post(this.url,json);
  }
}

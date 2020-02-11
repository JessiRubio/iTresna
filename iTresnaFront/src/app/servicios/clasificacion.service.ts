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
    /*
      El post se envia por json. 
    */
    /*
    return this.httpClient.post(this.url+"?cod_org="+cod_org
                                  +"&cod_tip="+cod_tip
                                  +"&categoria="+categoria);
    */
   return;
  }
}

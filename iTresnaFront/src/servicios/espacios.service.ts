import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EspaciosService {

  private url="http://localhost:8080/espacios/";

  constructor(private httpClient:HttpClient) { }

  getEspacios(cod_org:number):Observable<any>{
    return this.httpClient.get(this.url+'?usu_cod_org='+cod_org);
  }
}

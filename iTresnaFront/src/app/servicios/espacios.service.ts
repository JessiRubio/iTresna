import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspaciosItem } from '../clases/espaciosItem';


@Injectable({
  providedIn: 'root'
})
export class EspaciosService {

  private url="http://localhost:8080/espacios/";

  constructor(private httpClient:HttpClient) { }

  getEspacios(cod_org:number):Observable<any>{
    return this.httpClient.get<any>(this.url+'?usu_cod_org='+cod_org);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CopsService {

  private url="http://localhost:8080/cops/";

  constructor(private httpClient:HttpClient) {}

  getCops(cod_org:number,cod_esp:number):Observable<any>{
    return this.httpClient.get(this.url+'?cod_org='+cod_org+'&cod_esp='+cod_esp);
  }
}
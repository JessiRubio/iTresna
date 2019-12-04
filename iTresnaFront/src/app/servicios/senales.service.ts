import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenalesService {
  private URL = "http://127.0.0.1:8080/senales/"
  constructor(private http:HttpClient) { }

  getSenales(cod_org:number,cod_espacio:number,cod_cop:number):Observable<any>{
    var JSON={"cod_org":cod_org,"cod_esp":cod_espacio,"cod_cop":cod_cop};
    return this.http.get(this.URL+"?cod_org="+cod_org+"&cod_esp="+
                  cod_espacio+"&cod_cop="+cod_cop);

  }
}

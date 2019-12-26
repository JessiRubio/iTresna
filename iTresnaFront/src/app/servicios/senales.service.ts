import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SenalesItem } from '../clases/senales-item';

@Injectable({
  providedIn: 'root'
})
export class SenalesService {
  private URL = "http://127.0.0.1:8080/senales/"
  constructor(private http:HttpClient) { }

  getSenales(cod_org:number,cod_espacio:number,cod_cop:number,cod_usuario:string):Observable<any>{
    var JSON={"cod_org":cod_org,"cod_esp":cod_espacio,"cod_cop":cod_cop};
    return this.http.get(this.URL+"?cod_org="+cod_org+"&cod_esp="+
                  cod_espacio+"&cod_cop="+cod_cop+"&cod_usuario="+cod_usuario);

  }
  like(cod_usuario:string,cod_org:number,cod_esp:number,
    cod_cop:number,cod_senal:number):Observable<any>{
    var JSON={
      "cod_usuario":cod_usuario,
      "cod_org":cod_org,
      "cod_esp":cod_esp,
      "cod_cop":cod_cop,
      "cod_senal":cod_senal
    };
    return this.http.post(this.URL,JSON);
  }

  nuevaSenal(senal):Observable<any>{
    return this.http.post(this.URL,senal);
  }

  deleteSenal(senal):Observable<any>{
    console.log(senal);
    return this.http.delete(this.URL+"?cod_org="+senal.cod_org+"&cod_esp="+
        senal.cod_esp+"&cod_cop="+senal.cod_cop+"&cod_senal="+senal.cod_senal);
  }
}

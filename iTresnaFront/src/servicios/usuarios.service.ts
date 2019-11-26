import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url="http://localhost:8080/usuario/";
  constructor(
    private httpClient:HttpClient
  ) {}

  /* Llamada al servicio php con los atributos del login */
  login(usuario:string,password:string):Observable<any>{
    var json={'usuario':usuario,'password':password};
    return this.httpClient.post(this.url,json);
  }
}

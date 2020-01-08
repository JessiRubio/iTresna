import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private url="http://localhost:8080/comentarios/";

  constructor(private httpClient:HttpClient) { }

  getComentarios():Observable<any>{
    return this.httpClient.get<any>(this.url);
  }
}

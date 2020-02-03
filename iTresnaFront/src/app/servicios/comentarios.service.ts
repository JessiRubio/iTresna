import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private url="http://192.168.230.132:8080/comentarios/";
  constructor(private httpClient:HttpClient,private http:HttpClient) { }


  getComentarios(cod_senal:number):Observable<any>{
    return this.httpClient.get<any>(this.url+'?cod_senal='+cod_senal);
  }

  nuevoComentario(cod_comentario:number,cod_senal:number,cod_cop:number,cod_esp:number,cod_org:number,cod_usuario:string,comentario:string):Observable<any>
  {
    var comentarios={
      "accion":"nuevo_comentario",
      "cod_comentario":cod_comentario,
      "cod_senal":cod_senal,
      "cod_cop":cod_cop,
      "cod_esp":cod_esp,
      "cod_org":cod_org,
      "cod_usuario":cod_usuario,
      "comentario":comentario
    };

    return this.http.post(this.url,comentarios);
  }


}

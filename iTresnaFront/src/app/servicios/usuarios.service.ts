import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Usuario } from '../clases/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url="http://localhost:8080/usuario/";
  private loginState:Subject<boolean>;
  constructor(
    private httpClient:HttpClient
  ) {
    this.loginState=new Subject<boolean>();
    this.loginState.next(false);
  
  }
  
  logged():Observable<boolean>{
    return this.loginState.asObservable();
  }
  /* Llamada al servicio php con los atributos del login */
  login(usuario:string,password:string):Observable<any>{
    var json={'usuario':usuario,'password':password};
    var observable:Observable<any> = this.httpClient.post(this.url,json);
    observable.toPromise()
      .then(
        response=>{
          if(response.error==0){
            localStorage.setItem("usuario",JSON.stringify(response.usuario));
            this.loginState.next(response.error==0);

          }
        }
      )
      .catch(
        x=>{
        }
      );
      return observable;
  }
  logout(){
    localStorage.clear();
    this.loginState.next(false);
  }

  getUsuario(cod_org:number):Observable<any>{
    return this.httpClient.get<any>(this.url+'?cod_org='+cod_org);
  }

  getUsuarios(cod_org:number,cod_esp:number,cod_cop:number,clasif:string, categoria:string):Observable<any>{
    return this.httpClient.get<any>(this.url +'?cod_org='+ cod_org + 
                                    'cod_esp=' + cod_esp + 'cod_cop=' + cod_cop +
                                     'clasif=' + clasif + 'categoria=' + categoria);
  }

  modificarUsuario(nombre:string,ape1:string,ape2:string,campo_clasificador1:string,campo_clasificador2:string,campo_clasificador3:string,cod_usuario:string):Observable<any>{
    
    let json={
      "nombre":nombre,
      "ape1":ape1,
      "ape2":ape2,
      "campo_clasificador1":campo_clasificador1,
      "campo_clasificador2":campo_clasificador2,
      "campo_clasificador3":campo_clasificador3,
      "cod_usuario":cod_usuario
    };  
    return this.httpClient.put(this.url,json);
  }


  nuevoUsuario(cod_usuario:string,tip_usuario:number,cod_org:number,sarbidea:string,nombre:string,ape1:string,ape2:string,campo_clasificador1:string,campo_clasificador2:string,campo_clasificador3:string):Observable<any>{
    let json={
      "accion":"nuevo_usuario",
      "cod_usuario":cod_usuario,
      "tip_usuario":tip_usuario,
      "cod_org":cod_org,
      "sarbidea":sarbidea,
      "nombre":nombre,
      "ape1":ape1,
      "ape2":ape2,
      "campo_clasificador1":campo_clasificador1,
      "campo_clasificador2":campo_clasificador2,
      "campo_clasificador3":campo_clasificador3
    };  
    return this.httpClient.post(this.url,json);
  }

  eliminarUsuario(cod_usuario:string, cod_org:number):Observable<any>{
    return this.httpClient.delete(this.url+"?cod_usuario="+cod_usuario
                                  +"&cod_org="+cod_org);
  }



}

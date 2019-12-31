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
          console.log(x);
        }
      );
      return observable;
  }
  logout(){
    localStorage.clear();
    this.loginState.next(false);
  }
}

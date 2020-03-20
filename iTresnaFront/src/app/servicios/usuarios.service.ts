import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { Usuario } from '../clases/usuario';
import * as data from '../server-config.json';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url=data.domain+"/usuario/";
  private loginState:ReplaySubject<boolean>;
  constructor(
    private httpClient:HttpClient
  ) {
    this.loginState=new ReplaySubject<boolean>(1);
    this.loginState.next(false);
  
  }
  
  logged():Observable<boolean>{
    return this.loginState.asObservable();
  }
  /* Llamada al servicio php con los atributos del login */
  login(usuario:string,password:string):Observable<any>{
    var json={'accion':'login','usuario':usuario,'password':password};
    var observable:Observable<any> = this.httpClient.post(this.url,json);
    observable.subscribe(
      response=>{
        if(response.error==0){
          localStorage.setItem("usuario",JSON.stringify(response.usuario));
          this.loginState.next(response.error==0);
        }
      }
    );
    return observable;
  }
  logout(){
    localStorage.clear();
    this.loginState.next(false);
  }
  getUsuarioPorCodUsuario(cod_usuario:string):Observable<any>{
    return this.httpClient.get<any>(this.url+'?cod_usuario='+cod_usuario);
  }
  getUsuarios(cod_org:number):Observable<any>{
    return this.httpClient.get<any>(this.url+'?cod_org='+cod_org);
  }
  modificarDatosClasificatorios(cod_usuario:string,cod_org:number,
    clasificacion:string,categoria:string){
      let json={
        cod_org:cod_org,
        cod_usuario:cod_usuario,
        clasificacion:clasificacion,
        categoria:categoria,
        accion:"modificar_clasificacion"
      }
      return this.httpClient.put(this.url,json);
  }
  modificarUsuario(nombre:string,ape1:string,ape2:string,cod_usuario:string):Observable<any>{
    
    let json={
      "accion":"modificar_usuario",
      "nombre":nombre,
      "ape1":ape1,
      "ape2":ape2,
      "cod_usuario":cod_usuario
    };  
    return this.httpClient.put(this.url,json);
  }


  nuevoUsuario(cod_usuario:string,tip_usuario:number,cod_org:number,sarbidea:string,nombre:string,ape1:string,ape2:string):Observable<any>{
    let json={
      "accion":"nuevo_usuario",
      "cod_usuario":cod_usuario,
      "tip_usuario":tip_usuario,
      "cod_org":cod_org,
      "sarbidea":sarbidea,
      "nombre":nombre,
      "ape1":ape1,
      "ape2":ape2,
    };  
    return this.httpClient.post(this.url,json);
  }

  eliminarUsuario(cod_usuario:string, cod_org:number):Observable<any>{
    return this.httpClient.delete(this.url+"?cod_usuario="+cod_usuario
                                  +"&cod_org="+cod_org);
  }



  modificarPermisos(cod_usuario:string,cod_cop:number,cod_esp:number,cod_org:number,ind_admin:number):Observable<any>{
    
    let json={
      "accion":"modificar_permisos",
      "cod_usuario":cod_usuario,
      "cod_cop":cod_cop,
      "cod_esp":cod_esp,
      "cod_org":cod_org,
      "ind_admin":ind_admin
    };  
    return this.httpClient.put(this.url,json);
  }

  nuevoPermisos(cod_usuario:string,cod_cop:number,cod_esp:number,cod_org:number,ind_admin:number):Observable<any>{
    
    let json={
      "accion":"nuevo_permiso",
      "cod_usuario":cod_usuario,
      "cod_cop":cod_cop,
      "cod_esp":cod_esp,
      "cod_org":cod_org,
      "ind_admin":ind_admin
    };  
    return this.httpClient.post(this.url,json);
  }


  borrarPermisos(cod_usuario:string,cod_cop:number,cod_esp:number,cod_org:number,ind_admin:number):Observable<any>{
    return this.httpClient.delete(this.url+"?cod_usuario="+cod_usuario
                                  +"&cod_cop="+cod_cop
                                  +"&cod_esp="+cod_esp
                                  +"&cod_org="+cod_org
                                  +"&ind_admin="+ind_admin);
  }



  modificarContrasena(sarbidea:string,cod_org:number, cod_usuario:string):Observable<any>{
    
    let json={
      "accion":"modificar_contrasena",
      "sarbidea":sarbidea,
      "cod_org":cod_org,
      "cod_usuario":cod_usuario
    };  
    return this.httpClient.put(this.url,json);
  }


  modificarPerfil(nombre:string,ape1:string,ape2:string,cod_usuario:string,cod_usuarioAnterior:string, cod_org:number):Observable<any>{
    
    let json={
      "accion":"modificar_perfil",
      "nombre":nombre,
      "ape1":ape1,
      "ape2":ape2,
      "cod_usuario":cod_usuario,
      "cod_usuarioAnterior":cod_usuarioAnterior,
      "cod_org":cod_org
    };  
    return this.httpClient.put(this.url,json);
  }






}

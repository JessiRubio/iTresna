import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../../servicios/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:string;
  password:string;
  error:string;
  
  constructor(
    private usuariosService:UsuariosService,
    private ruta: Router
  ) { 
    this.usuario = "";
    this.password = "";
    this.error = "";
  }

  ngOnInit() {
  }

  /* Funciones para el login */
  login(){
    this.usuariosService.login(this.usuario, this.password).subscribe(
      res=>{

        if(res.error==0 && res.nombre!=null){
          localStorage.setItem("cod_usuario",res.cod_usuario);
          localStorage.setItem("tip_usuario",res.tip_usuario);
          localStorage.setItem("usu_cod_org",res.cod_org);
          localStorage.setItem("usu_password",res.sarbidea);
          localStorage.setItem("usu_nombre",res.nombre);
          localStorage.setItem("ape1", res.ape1);
          localStorage.setItem("ape2", res.ape2);

          this.ruta.navigateByUrl("Principal");
        }
        else{
          this.error = "Datos incorrectos"
        }

      },
      err=>{
        console.error(err);

      }
    );
  }
}

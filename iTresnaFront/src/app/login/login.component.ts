import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../servicios/usuarios.service';
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
        if(res.error==0){
          var usuarioParsed:string=JSON.stringify(res.usuario);
          localStorage.setItem("usuario",usuarioParsed);
          
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

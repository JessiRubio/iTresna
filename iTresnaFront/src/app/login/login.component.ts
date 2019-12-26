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
      response=>{
        if(response.error==0){
          localStorage.setItem("usuario",JSON.stringify(response.usuario));
          this.ruta.navigateByUrl("Principal");
        }
      },
      error=>{

      }
    );
  }
}

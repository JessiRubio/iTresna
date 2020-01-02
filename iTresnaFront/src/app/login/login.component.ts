import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../servicios/usuarios.service';
import { Router } from '@angular/router';
import { ifError } from 'assert';
import { Usuario } from  './../clases/usuario';


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
    private router: Router
  ) { 
    
    this.usuario = "";
    this.password = "";
    this.error = "";
  }

  ngOnInit() {
    if(localStorage.getItem("usuario")!=null){
      this.router.navigateByUrl("Principal");
    }
    this.usuariosService.logged().subscribe(
      respose=>{
        if(respose)
          this.router.navigateByUrl("Principal");
        
      }
    );

    
  }
  /* Funciones para el login */
  login(){
    this.usuariosService.login(this.usuario, this.password).subscribe(
      response=>{
        if(response.error==1){
          this.error="Datos Incorrectos";
          setTimeout(()=>this.error="",2500);
        }
      },
      error=>{

      }
    );

  
  }
}

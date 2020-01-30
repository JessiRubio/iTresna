import { Component, OnInit, ɵConsole } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Route, Router } from '@angular/router';
import { Organizacion } from '../clases/Organizacion';
import {UsuariosService}from '../servicios/usuarios.service';

@Component({
  selector: 'app-header-generico',
  templateUrl: './header-generico.component.html',
  styleUrls: ['./header-generico.component.css']
})
export class HeaderGenericoComponent implements OnInit {

  usuario:Usuario;
  organizacion:Organizacion;
  logged:boolean=false;
  constructor(private ruta:Router,private userService:UsuariosService) { 
    
   
  }

  ngOnInit() {
    this.userService.logged().subscribe(
      response=>{
        this.logged=response;
        if(response){
          this.usuario=JSON.parse(localStorage.getItem("usuario"));
        }
        else{
          if(localStorage.length>0){
            this.usuario=JSON.parse(localStorage.getItem("usuario"));
            this.logged=true;
          }else{
            this.usuario=new Usuario();
          }
        }
      }
    );
  }

  atras(){
    if(this.usuario.tip_usuario==1){
      this.ruta.navigateByUrl("Organizaciones");
    }
    else{
      this.ruta.navigateByUrl("Principal");
    }
  }
}

import { Component, OnInit, ɵConsole } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Route, Router } from '@angular/router';
import { Organizacion } from '../clases/Organizacion';

@Component({
  selector: 'app-header-generico',
  templateUrl: './header-generico.component.html',
  styleUrls: ['./header-generico.component.css']
})
export class HeaderGenericoComponent implements OnInit {

  usuario:Usuario;
  organizacion:Organizacion;
  constructor(private ruta:Router) { 
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }

  ngOnInit() {
  }

  atras(){
    if(this.usuario.tip_usuario==1){
      this.usuario.cod_org=null;
      localStorage.setItem("usuario",JSON.stringify(this.usuario));
      this.organizacion=null;
      localStorage.setItem("organizacion",JSON.stringify(this.organizacion));
      this.ruta.navigateByUrl("Organizaciones");

      console.log(JSON.parse(localStorage.getItem("usuario")));
    }
    else{
      this.ruta.navigateByUrl("Principal");
    }
  }
}

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
      this.ruta.navigateByUrl("Organizaciones");
    }
    else{
      this.ruta.navigateByUrl("Principal");
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, Permiso } from '../clases/usuario';


@Component({
  selector: 'app-menu-overflow',
  templateUrl: './menu-overflow.component.html',
  styleUrls: ['./menu-overflow.component.css']
})
export class MenuOverflowComponent implements OnInit {

  constructor( private ruta: Router) { }


  ngOnInit() {
  }

  onClick(e){

    if(e.target.innerHTML==='Cerrar sesión'){
      localStorage.clear();
      this.ruta.navigateByUrl("");

    }

  }

  cerrarSesion(){

    this.ruta.navigateByUrl("");

  }

}

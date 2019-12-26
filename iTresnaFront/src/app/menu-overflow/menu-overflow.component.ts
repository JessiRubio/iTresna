import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, Permiso } from '../clases/usuario';
import { UsuariosService } from '../servicios/usuarios.service';


@Component({
  selector: 'app-menu-overflow',
  templateUrl: './menu-overflow.component.html',
  styleUrls: ['./menu-overflow.component.css']
})
export class MenuOverflowComponent implements OnInit {

  constructor( private ruta: Router,private usuarioService:UsuariosService) {


  }


  ngOnInit() {
  }

  onClick(e){
    if(e.target.innerHTML==='Cerrar sesión'){
      this.usuarioService.logout();
    }
  }

}

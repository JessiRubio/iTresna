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

  open:boolean=false;
  public show:boolean = false;
 
  usuarioLogado:Usuario;
  constructor( private ruta: Router,
                private usuarioService:UsuariosService) 
  {

  }

  ngOnInit() {
    this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));

    if(this.usuarioLogado.tip_usuario<3){
      this.visible();
    }
  }

  onClick(e){
    this.toggleMenu();
    if(e.target.innerHTML==='Cerrar sesión'){
      this.usuarioService.logout();
    }
    else if(e.target.innerHTML==='Administración'){
      this.ruta.navigateByUrl('Administracion');
    }
    else if(e.target.innerHTML==='Perfil'){
      this.ruta.navigateByUrl('Perfil');
    }
  }

  visible(){
    this.show = !this.show;
  }

  toggleMenu(){
    console.log(this.open);
    this.open=!this.open;
  }
}

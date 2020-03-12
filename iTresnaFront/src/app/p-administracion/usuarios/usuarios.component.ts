import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios:boolean=false;
  permisos:boolean=false;
  usuario(){
    this.usuarios=true;
    this.permisos=false;
  }
  permiso(){
    this.usuarios=false;
    this.permisos=true;
  }
  ngOnInit(){}
}
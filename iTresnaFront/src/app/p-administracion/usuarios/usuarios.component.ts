import { Component, OnInit } from '@angular/core';
import { CopsItem } from '../../clases/copsitem';
import { CopsService } from '../../servicios/cops.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listaCops:CopsItem[] = [];
  listaUsuarios:Usuario[] = [];
  listaCategorias:string[] = [];
  listaClasificacion=[];

  constructor(copsService:CopsService,
              usuarioServeice:UsuariosService) { }

  ngOnInit() {
  }

}

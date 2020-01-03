import { Component, OnInit } from '@angular/core';
import { CopsItem } from '../../clases/copsitem';
import { CopsService } from '../../servicios/cops.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
import { Organizacion } from '../../clases/organizacion';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listaCops:CopsItem[] = [];
  listaUsuarios:Usuario[] = [];
  listaCategorias:string[] = [];
  listaClasificacion=[]=[];
  organizacion:Organizacion;

  constructor(private copsService:CopsService,
              private usuarioService:UsuariosService) { }

  ngOnInit() {
    this.cargarUsuarios(this.organizacion.cod_org);
  }

  cargarUsuarios(cod_org:number){
    this.usuarioService.getUsuario(cod_org).subscribe(
      res=>{
        this.listaUsuarios=res.usuarios;
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    );
  }

  cargarclasificacion(){

  }

}

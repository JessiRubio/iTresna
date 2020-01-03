import { Component, OnInit } from '@angular/core';
import { CopsItem } from '../../clases/copsitem';
import { CopsService } from '../../servicios/cops.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
import { Organizacion } from '../../clases/organizacion';
import { OrganizacionesService } from '../../servicios/organizaciones.service';

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
  usuarioLogeado:Usuario;

  constructor(private organizacionService:OrganizacionesService,
              private copsService:CopsService,
              private usuarioService:UsuariosService) 
  {
  }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.cargarUsuarios(this.usuarioLogeado.cod_org);
    this.cargarOrganizacion(this.usuarioLogeado.cod_org);
    /*this.cargarCops(this.usuarioLogeado.cod_org);*/
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

  cargarOrganizacion(cod_org:number){
    this.organizacionService.getOrganizacionActual(cod_org).subscribe(
      res =>{
        console.log(res);
        this.organizacion=res.organizacion;

        this.listaClasificacion=[];
        this.listaClasificacion[0] =this.organizacion.clasif1;
        this.listaClasificacion[1] =this.organizacion.clasif2;
        this.listaClasificacion[2] =this.organizacion.clasif3;
        
        this.listaCategorias=res.categorias;
      },
      err =>{
        console.log(err);
      }
    );
  }
  /*cargarCops(cod_org:number){
    this.copsService.getCopsAdministracion(cod_org).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
  }*/

}

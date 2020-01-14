import { Component, OnInit } from '@angular/core';
import { CopsItem } from '../../clases/copsitem';
import { CopsService } from '../../servicios/cops.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
import { Organizacion, Categorias } from '../../clases/organizacion';
import { OrganizacionesService } from '../../servicios/organizaciones.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listaCops:CopsItem[] = [];
  listaUsuarios:Usuario[] = [];
  listaCategorias:Categorias[] = [];
  listaClasificacion=[]=[];
  organizacion:Organizacion;
  usuarioLogado:Usuario;

  constructor( private copsService:CopsService,
              private usuarioService:UsuariosService) 
  {
  }

  ngOnInit() {
    this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
    this.cargarUsuarios(this.usuarioLogado.cod_org);
    this.organizacion=JSON.parse(localStorage.getItem("organizacion"));
    console.log(this.organizacion);
    this.listaClasificacion=[];
        this.listaClasificacion[0] =this.organizacion.clasif1;
        this.listaClasificacion[1] =this.organizacion.clasif2;
        this.listaClasificacion[2] =this.organizacion.clasif3;

        this.listaCategorias=this.organizacion.categorias;
    
  }

  cargarUsuarios(cod_org:number){
    this.usuarioService.getUsuario(cod_org).subscribe(
      res=>{
        this.listaUsuarios=res.usuarios;
      },
      err =>{
        console.log(err);
      }
    );
  }


  filtrarCategorias(clasificacion:string){
    this.listaCategorias = [];
    for(var pos=0;pos<this.organizacion.categorias.length;pos++){
      if (this.organizacion.categorias[pos].tip_clasificacion===clasificacion){
        this.listaCategorias.push(this.organizacion.categorias[pos]);
      }
    }
  }

}

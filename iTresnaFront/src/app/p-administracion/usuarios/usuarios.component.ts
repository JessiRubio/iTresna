import { Component, OnInit } from '@angular/core';
import { CopsItem } from '../../clases/copsitem';
import { CopsService } from '../../servicios/cops.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
import { Organizacion, Categorias } from '../../clases/organizacion';
import { OrganizacionesService } from '../../servicios/organizaciones.service';
import { EspaciosService } from '../../servicios/espacios.service';
import { EspaciosItem } from '../../clases/espaciosItem';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listaEspacios:EspaciosItem[] = []
  listaCops:CopsItem[] = [];
  listaUsuarios:Usuario[] = [];
  listaCategorias:Categorias[] = [];
  listaClasificacion =[] = [];

  organizacion:Organizacion;
  usuarioLogado:Usuario;
  show:boolean = false;
  showCops:boolean = false;
  showTabla:boolean = false;

  selected:string;
  selectedCategoria:Categorias;
  selectedEspacio:EspaciosItem;
  selectedCop:CopsItem;


  constructor( private copsService:CopsService,
              private espaciosService:EspaciosService,
              private usuarioService:UsuariosService,
              private organizacionService:OrganizacionesService) 
  {
  }

  ngOnInit() {
    this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
    this.organizacionService.getOrganizacionActual(this.usuarioLogado.cod_org).subscribe(
      response=>{
        this.organizacion=response.organizacion;
        this.listaClasificacion[0] =this.organizacion.clasif1;
        this.listaClasificacion[1] =this.organizacion.clasif2;
        this.listaClasificacion[2] =this.organizacion.clasif3;

        this.cargarEspacios(this.organizacion.cod_org);
      },
      error=>{

      }
    )
    console.log(this.organizacion);
    
  }

  filtrarCategorias(clasificacion:string){
    this.show = true;
    this.listaCategorias = [];
    for(var pos=0;pos<this.organizacion.categorias.length;pos++){
      if (this.organizacion.categorias[pos].tip_clasificacion===clasificacion){
        this.listaCategorias.push(this.organizacion.categorias[pos]);
      }
    }

  }

  cargarEspacios(cod_org:number){
    this.espaciosService.getEspacios(cod_org).subscribe(
      res=>{
        this.listaEspacios = res.espacios
      },
      err=>{
        console.log(err);
      }
    );
  }

  cargarCops(espacio:EspaciosItem){
    var esp:EspaciosItem;
    for(var pos=0;pos<this.listaEspacios.length;pos++){

      if(this.listaEspacios[pos].desc_esp===espacio.desc_esp){
        esp = this.listaEspacios[pos];
        break;
      }
    }

    this.descargarCops(esp);
    this.showCops = true;
  }

  descargarCops(esp:EspaciosItem){
    this.copsService.getCops(this.organizacion.cod_org,esp.cod_esp,this.usuarioLogado.cod_usuario).subscribe(
      res=>{
        this.listaCops = res.cops;
      },
      err=>{
        console.log(err);
      }
    );
  }
  async cargarTabla(cop:CopsItem){
    this.selectedCop = cop;
    await this.cargarUsuarios();
    this.showTabla = true;
    
  }

  cargarUsuarios(){

    this.usuarioService.getUsuarios(this.organizacion.cod_org, 
                                    this.selectedEspacio.cod_esp, 
                                    this.selectedCop.cod_cop,
                                    this.selected, 
                                    this.selectedCategoria.categoria).subscribe(
      res=>{
        this.listaUsuarios= res.usuarios;
        console.log(res);
      },
      err=>{

      }
    );
    
  }
  /*  cargarUsuarios(cod_org:number){
    this.usuarioService.getUsuario(cod_org).subscribe(
      res=>{
        this.listaUsuarios=res.usuarios;
      },
      err =>{
        console.log(err);
      }
    );
  }*/ 
}

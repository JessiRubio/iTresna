import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CopComponent } from './cops/cop.component';
import { CopsItem } from '../clases/copsitem';
import { EspaciosService } from './../servicios/espacios.service';
import { CopsService } from './../servicios/cops.service';
import { EspaciosItem } from '../clases/espaciosItem';
import { NavigationExtras } from '@angular/router'
import { Usuario, Permiso } from '../clases/usuario';
import { UsuariosService } from '../servicios/usuarios.service';
import { OrganizacionesService } from '../servicios/organizaciones.service';
import { Organizacion } from '../clases/organizacion';

@Component({
  selector: 'app-p-espacios',
  templateUrl: './p-espacios.component.html',
  styleUrls: ['./p-espacios.component.css']
})
export class PEspaciosComponent implements OnInit {
  nombre:string;
  usuarioLogado:Usuario;
  listaEspacios:EspaciosItem[];
  selected:number = 0;
  organizacion:Organizacion= new Organizacion();
  constructor(
    private espaciosService:EspaciosService,
    private copService:CopsService,
    private router: Router,
    private usuarioService:UsuariosService,
    private organizacionService:OrganizacionesService
  ) { 
    this.listaEspacios=[];
  }


  ngOnInit() {
    if(localStorage.length>0){

      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      if(this.usuarioLogado.tip_usuario==1){
        this.router.navigateByUrl("Organizaciones");
      }else{
        this.espaciosPorCod(this.usuarioLogado.cod_org);
        this.cargarOrganizacion(this.usuarioLogado.cod_org);
      }
      
     
    }else{
      this.router.navigateByUrl("");
    }
  }
  cargarOrganizacion(cod_org:number){
    this.organizacionService.getOrganizacionActual(this.usuarioLogado.cod_org)
      .subscribe(
        response=>{
          this.organizacion=response.organizacion;
          
        }
      );
  }
  espaciosPorCod(cod_org:number){
    this.espaciosService.getEspacios(cod_org)
        .subscribe(
          res =>{
            if(res.error == 0){
              this.listaEspacios=res.espacios;
              this.listaEspacios.forEach(x=>{
                x.listaCop=[];
                this.cargarCops(x);
              });
            }
            else{
            }
          }, 
          err =>{

          } 
      );
  }
  
  obtCops():CopsItem[]{
    try{
      return this.listaEspacios[this.selected].listaCop;
    }catch{
      return [];
    }
  }

  cambiarSeleccionado(i:number){
    if(i!=this.selected){
      this.selected=i;
    }
  }

  cargarCops(espacio:EspaciosItem){
    this.copService.getCops(espacio.cod_org,espacio.cod_esp,this.usuarioLogado.cod_usuario).subscribe(
        res=>{
            if(res.error == 0){
                espacio.listaCop = res.cops;
            }else{
              //TODO alert
            }
        },
        err=>{
        }
    );
  }
  
  estaEnPermisos(item:CopsItem):boolean{
    return this.usuarioLogado.permisos.filter(x=>{
      return x.cod_org===item.cod_org && x.cod_esp===item.cod_esp && x.cod_cop===item.cod_cop;
    }).length>0
    ||this.usuarioLogado.tip_usuario<=2;
  }

}

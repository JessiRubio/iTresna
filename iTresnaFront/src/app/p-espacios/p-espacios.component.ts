import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CopsComponent } from './cops/cops.component';
import { CopsItem } from '../clases/copsitem';
import { EspaciosService } from '../../servicios/espacios.service';
import { CopsService } from '../../servicios/cops.service';
import { EspaciosItem } from '../clases/espaciosItem';
import { NavigationExtras } from '@angular/router'
import { Usuario, Permiso } from '../clases/usuario';


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
  constructor(
    private espaciosService:EspaciosService,
    private copService:CopsService,
    private router: Router
  ) { 
    this.listaEspacios=[];
  }


  ngOnInit() {
    if(localStorage.length>0){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      this.espaciosPorCod(this.usuarioLogado.cod_org);
    }
  }
  espaciosPorCod(cod_org:number){
    this.espaciosService.getEspacios(cod_org)
        .subscribe(
          res =>{
            if(res.error == 0){
              console.dir(res.espacios);
               this.listaEspacios=res.espacios;
               this.listaEspacios.forEach(x=>{
                 x.listaCop=[];
                 this.cargarCops(x);
               });
               
            }else{
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

  public cargarCops(espacio:EspaciosItem){
    this.copService.getCops(espacio.cod_org,espacio.cod_esp).subscribe(
        res=>{
            if(res.error == 0){
                espacio.listaCop = res.cops;
            }else{
              //TODO alert
            }
        },
        err=>{
            //TODO
        }
    );
  }
  
  estaEnPermisos(item:CopsItem):boolean{
    return this.usuarioLogado.permisos.filter(x=>x.cod_esp===item.cod_esp && x.cod_cop===item.cod_cop && x.ind_admin).length>0;
  }
}

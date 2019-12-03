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
  listaEspacios:EspaciosItem[]=[];
  selected:number = 0;
  listaCops:CopsItem[];
  constructor(
    private espaciosService:EspaciosService,
    private copsService:CopsService,
    private router: Router
  ) { 
  }


  async ngOnInit() {
    if(localStorage.length>0){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      await this.espaciosPorCod(this.usuarioLogado.cod_org);
    }
  }
  espaciosPorCod(cod_org:number){
    this.espaciosService.getEspacios(cod_org)
        .subscribe(
          res =>{
            if(res.error == 0){
               var espaciosTemp:EspaciosItem[]=res.espacios;
               espaciosTemp.forEach(x=>this.listaEspacios.push(x));
               this.cargarCops();
            }else{
              //TODO Allert
            }
          }, 
          err =>{

          } 
      );
  }

  cambiarSeleccionado(i:number){
    if(i!=this.selected){
      this.selected=i;
      this.cargarCops();
    }
  }

  cargarCops(){
    var espacio:EspaciosItem=this.listaEspacios[this.selected];
    this.copsService.getCops(espacio.cod_org, espacio.cod_esp)
        .subscribe(
          res =>{
            if(res.error == 0){
                this.listaCops = res.cops;
            }else{
              //TODO alert
            }
          },
          err =>{

          }
        );
  }
  cambiarPagina(item:CopsItem){
    if(this.usuarioLogado.permisos.filter(x=>x.cod_esp===item.cod_esp && x.cod_cop===item.cod_cop && x.ind_admin).length>0){
      this.router.navigateByUrl('/Cops',{
        queryParams:{copSeleccionado:item.cod_cop,codEspacio:item.cod_esp}
      });
    }
  }
  estaEnPermisos(item:CopsItem):boolean{
    return this.usuarioLogado.permisos.filter(x=>x.cod_esp===item.cod_esp && x.cod_cop===item.cod_cop && x.ind_admin).length>0;
  }


}

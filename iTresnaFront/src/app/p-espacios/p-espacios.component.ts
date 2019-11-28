import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CopsComponent } from './cops/cops.component';
import { CopsItem } from '../clases/copsitem';
import { EspaciosService } from '../../servicios/espacios.service';
import { CopsService } from '../../servicios/cops.service';
import { EspaciosItem } from '../clases/espaciosItem';
import { NavigationExtras } from '@angular/router'


@Component({
  selector: 'app-p-espacios',
  templateUrl: './p-espacios.component.html',
  styleUrls: ['./p-espacios.component.css']
})
export class PEspaciosComponent implements OnInit {
  nombre:string;
  listaEspacios:EspaciosItem[];
  selected:number = 0;
  listaCops:CopsItem[];
  constructor(
    private espaciosService:EspaciosService,
    private copsService:CopsService,
    private router: Router
  ) { 
    this.nombre = "";
  }


  ngOnInit() {
    var usuario=localStorage.getItem("usu_nombre");
    if(localStorage.length>0){
      this.nombre=usuario.toString();
    }
    this.espacios();
  }

  espacios(){

    this.espaciosService.getEspacios(parseInt(localStorage.getItem("usu_cod_org")))
        .subscribe(
          res =>{
            if(res.error == 0){
               this.listaEspacios=res.espacios;
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
    this.selected=i;
    this.cargarCops();
  }

  cargarCops(){
    this.copsService.getCops(this.listaEspacios[this.selected].cod_org, this.listaEspacios[this.selected].cod_esp)
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
        )
  }
}

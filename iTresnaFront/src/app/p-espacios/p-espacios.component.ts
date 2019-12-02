import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CopsComponent } from './cops/cops.component';
import { CopsItem } from '../clases/copsitem';
import { EspaciosService } from '../../servicios/espacios.service';
import { CopsService } from '../../servicios/cops.service';
import { EspaciosItem } from '../clases/espaciosItem';
import { NavigationExtras } from '@angular/router'
import { Usuario } from '../clases/usuario';


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
  listaCops:CopsItem[];
  constructor(
    private espaciosService:EspaciosService,
    private copsService:CopsService,
    private router: Router
  ) { 
  }


  ngOnInit() {

    
    if(localStorage.length>0){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      this.espacios();
    }
    
  }

  espacios(){
    this.espaciosService.getEspacios(this.usuarioLogado.cod_org)
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

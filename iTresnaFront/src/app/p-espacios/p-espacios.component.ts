import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CopsComponent } from './cops/cops.component';
import { CopsItem } from '../clases/copsitem';
import { EspaciosService } from '../../servicios/espacios.service';

@Component({
  selector: 'app-p-espacios',
  templateUrl: './p-espacios.component.html',
  styleUrls: ['./p-espacios.component.css']
})
export class PEspaciosComponent implements OnInit {
  nombre:string;
  listaEspacios:string[];
  selected:number = 0;
  listaCops:CopsItem[]=[new CopsItem("Relevante","1"),
                        new CopsItem("Relevante","1"),
                        new CopsItem("Relevante","1"),
                        new CopsItem("Relevante","1"),
                        new CopsItem("Relevante","1"),
                        new CopsItem("Relevante","1")];
  constructor(
    private espaciosService:EspaciosService,
    private ruta: Router
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
               console.log("espacios cargados");
            }
          }, 
          err =>{

          } 
        )
  }

  cargarCops(){

    this.CopsService.getCops(listaEspacios[selected].usu_cod_org, listaEspacios[selected].cod_esp)
        .subscribe(
          res =>{
            if(res.error == 0){
            
            }
          },
          err =>{

          }
        )
    //LAMADA A LA BBDD
    //this.listaCops=array de entrada
  }

}

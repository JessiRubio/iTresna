import { Component, OnInit, Input } from '@angular/core';
import { CopsItem } from '../clases/copsitem';
import { EspaciosItem } from '../clases/espaciosItem';
import { ActivatedRoute, Router, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { EspaciosService } from '../../servicios/espacios.service';
import { CopsService } from '../../servicios/cops.service';

@Component({
  selector: 'app-p-cops',
  templateUrl: './p-cops.component.html',
  styleUrls: ['./p-cops.component.css']
})

export class PCopsComponent implements OnInit {
  
  private listaEspacios:EspaciosItem[];
  private listaCops:CopsItem[];
  private copSeleccionado:number;
  private cod_org:number;
  private cod_esp:number;
  
  constructor(
    private route: ActivatedRoute,
    private espaciosService:EspaciosService,
    private copsService:CopsService) {}
  ngOnInit() {
    this.cod_org=parseInt(localStorage.getItem("usu_cod_org"));
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.copSeleccionado = params['copSeleccionado'];
      var codEspacios = params['codEspacio'];
      this.cargarEspacios();
      this.cargarCops();
    });
    
  }

  cargarEspacios(){
    this.espaciosService.getEspacios(this.cod_org)
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
  cargarCops(){
    this.copsService.getCops(this.cod_org,this.cod_esp)
        .subscribe(
          res =>{
            if(res.error == 0){
                this.listaCops = res.cops;
            }else{
            }
          },
          err =>{

          }
        )
  }

}

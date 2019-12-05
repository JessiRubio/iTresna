import { Component, OnInit, Input } from '@angular/core';
import { CopsItem } from '../clases/copsitem';
import { EspaciosItem } from '../clases/espaciosItem';
import { SenalesItem } from './../clases/senales-item';
import { ActivatedRoute, Router, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { EspaciosService } from './../servicios/espacios.service';
import { SenalesService} from './../servicios/senales.service';
import { CopsService } from './../servicios/cops.service';

@Component({
  selector: 'app-p-cops',
  templateUrl: './p-cops.component.html',
  styleUrls: ['./p-cops.component.css']
})

export class PCopsComponent implements OnInit {
  
  private listaEspacios:EspaciosItem[];
  private listaSenales:SenalesItem[];
  private listaCops:CopsItem[];
  private copSeleccionado:number;
  private cod_org:number;
  private cod_esp:number;
  private cod_cop:number;
  private admin:boolean=false;
  private visible: boolean = false ; // hidden by default
  
  constructor(
    private route: ActivatedRoute,
    private espaciosService:EspaciosService,
    private copsService:CopsService,
    private senalesService:SenalesService) {}
  ngOnInit() {
    this.cod_org=parseInt(localStorage.getItem("usu_cod_org"));
    this.route.queryParams.subscribe(params => {
      this.cod_cop = params['copSeleccionado'];
      this.cod_esp = params['codEspacio'];
      this.admin = params['admin'];
      this.cargarEspacios();
      this.cargarCops();
      this.cargarSenales();
    });
    
  }

  cargarEspacios(){
    this.espaciosService.getEspacios(this.cod_org)
        .subscribe(
          res =>{
            if(res.error == 0){
               this.listaEspacios=res.espacios;
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
              //TODO Allert
            }
          },
          err =>{

          }
        );
  }
  cargarSenales(){
    console.log("entra");
    this.senalesService.getSenales(this.cod_org,this.cod_esp,this.cod_cop).subscribe(
      res=>{
        if(res.error==0){
          this.listaSenales=res.senales;
          console.log(this.listaSenales);
        }
      },
      err=>{

      }
    );
  }

  volverAtras(item){
    console.warn("TODO esta funcion aun esta por hacer, volvera a la pestaña anterior seleccionando el espacio")
  }
  visibilidad() {

    this.visible = ! this.visible;
    
    }

}

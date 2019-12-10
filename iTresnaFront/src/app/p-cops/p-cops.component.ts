import { Component, OnInit, Input } from '@angular/core';
import { CopsItem } from '../clases/copsitem';
import { EspaciosItem } from '../clases/espaciosItem';
import { SenalesItem } from './../clases/senales-item';
import { ActivatedRoute, Router, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { EspaciosService } from './../servicios/espacios.service';
import { SenalesService} from './../servicios/senales.service';
import { CopsService } from './../servicios/cops.service';
import { Usuario } from  './../clases/usuario';

@Component({
  selector: 'app-p-cops',
  templateUrl: './p-cops.component.html',
  styleUrls: ['./p-cops.component.css']
})

export class PCopsComponent implements OnInit {
  private usuarioLogeado:Usuario;
  private listaEspacios:EspaciosItem[];
  private listaSenales:SenalesItem[];
  private listaCops:CopsItem[];
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
    console.log("llego");
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.route.queryParams.subscribe(params => {
      this.cod_cop = params['copSeleccionado'];
      this.cod_esp = params['codEspacio'];
      this.admin = params['admin']==1;
      this.cargarEspacios();
      this.cargarCops();
      this.cargarSenales();
    });
    
  }

  cargarEspacios(){
    this.espaciosService.getEspacios(this.usuarioLogeado.cod_org)
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
    this.copsService.getCops(this.usuarioLogeado.cod_org,this.cod_esp)
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
    this.senalesService.getSenales(this.usuarioLogeado.cod_org,this.cod_esp,this.cod_cop,this.usuarioLogeado.cod_usuario).subscribe(
      res=>{
        if(res.error==0){
          this.listaSenales=res.senales;
        }
      },
      err=>{

      }
    );
  }
  cambiarCopSeleccion(i:number){
    if(this.cod_cop=i){
      this.cod_cop=i;
      this.cargarSenales();
    }
  }
  volverAtras(item){
    console.warn("TODO esta funcion aun esta por hacer, volvera a la pestaña anterior seleccionando el espacio")
  }
  visibilidad() {
    this.visible = ! this.visible;
  }

  tienePermisos():boolean{
    var permisos=this.usuarioLogeado.permisos.filter(x=>x.cod_esp===this.cod_esp && x.cod_cop===this.cod_cop);
    if(permisos.length>0){
      return permisos[0].ind_admin;
    }
    return false;
  }
  
}

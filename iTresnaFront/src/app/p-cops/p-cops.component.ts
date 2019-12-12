import { Component, OnInit, Input } from '@angular/core';
import { CopsItem } from '../clases/copsitem';
import { EspaciosItem } from '../clases/espaciosItem';
import { SenalesItem } from './../clases/senales-item';
import { ActivatedRoute, Router, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { EspaciosService } from './../servicios/espacios.service';
import { SenalesService} from './../servicios/senales.service';
import { CopsService } from './../servicios/cops.service';
import { Usuario } from  './../clases/usuario';
import { Observable } from 'rxjs';
import { Etiqueta } from '../clases/etiquetaitem';

@Component({
  selector: 'app-p-cops',
  templateUrl: './p-cops.component.html',
  styleUrls: ['./p-cops.component.css']
})

export class PCopsComponent implements OnInit {
  private usuarioLogeado:Usuario;
  private cod_esp:number;
  private cod_cop:number;
  private admin:boolean=false;
  private visible: boolean = false ; // hidden by default

  private listaSenales:SenalesItem[]=[];
  private listaEtiquetas:Etiqueta[]=[];
  private listaUsuarios:string[]=[];
  private cop:CopsItem;
  private espacio:EspaciosItem;
  selected: string = '';


  
  constructor(
    private route: ActivatedRoute,
    private espaciosService:EspaciosService,
    private copsService:CopsService,
    private senalesService:SenalesService) {}

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.route.queryParams.subscribe(params => {
      this.cod_cop = params['copSeleccionado'];
      this.cod_esp = params['codEspacio'];
      this.cargarEsp();
      this.cargarCop();
      this.cargarSenales();
    });
  }
  cargarEsp(){
    this.espaciosService.getEspacio(this.usuarioLogeado.cod_org,this.cod_esp)
        .subscribe(
          res=>{
            if(res.error==0){
              this.espacio=res.espacio;
            }
          },
          err=>{
            
          }
        );
  }
  cargarCop(){
    this.copsService.getCop(this.usuarioLogeado.cod_org,this.cod_esp,this.cod_cop)
      .subscribe(
        res=>{  
          console.log(res);
          if(res.error==0){
            this.cop=res.cop;
          }
        },
        err=>{

        }
      );
  }
  selectChangeHandler (event: any) {
    this.selected = event.target.value;
    console.warn(this.selected);
  }
  cargarSenales(){
    this.senalesService.getSenales(this.usuarioLogeado.cod_org,this.cod_esp,this.cod_cop,this.usuarioLogeado.cod_usuario).subscribe(
      res=>{
        if(res.error==0){
          this.listaSenales=res.senales;
          this.listaEtiquetas=res.etiquetas;
          this.listaUsuarios=res.usuarios;
        }
      },
      err=>{

      }
    );
  }
  cambiarCopSeleccion(i:number){
    if(this.cod_cop=i){
      this.cod_cop=i;
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

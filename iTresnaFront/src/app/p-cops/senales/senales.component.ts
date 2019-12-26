import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { SenalesItem } from '../../clases/senales-item';
import { Usuario } from  './../../clases/usuario';
import { SenalesService } from '../../servicios/senales.service';

@Component({
  selector: 'app-senales',
  templateUrl: './senales.component.html',
  styleUrls: ['./senales.component.css']
})
export class SenalesComponent implements OnInit {

  private usuarioLogeado:Usuario;
  private cod_esp:number;
  private cod_cop:number;
  private admin:boolean=false;
  
  @Input() senal:SenalesItem;
  private titulo:String= "Lorem Ipsum";
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private senalesService:SenalesService
    ) {

    this.router.events.subscribe((ev)=>{
      if(localStorage.length==0){
        this.router.navigateByUrl("");
      }
    });
   }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.route.queryParams.subscribe(params => {
      this.cod_cop = params['copSeleccionado'];
      this.cod_esp = params['codEspacio'];
    });

    this.cargarTituloPagina();
  }
  
  like(){
    var codUser=this.usuarioLogeado.cod_usuario;
    this.senalesService.like(codUser,this.senal.cod_org,this.senal.cod_esp,this.senal.cod_cop,this.senal.cod_senal).subscribe(
      res=>{
        if(res.error==0){
          if(res.aniadido==1){
            this.senal.me_ha_gustado=true;
            this.senal.me_gustas+=1;
          }else{
            this.senal.me_ha_gustado=true;
            this.senal.me_gustas-=1;
          }
        }
      }
    );
  }
  cargarTituloPagina(){
    console.warn("TODO esta funcion esta por hacer, cargara el titulo en la señal.")
  }
  puedeEditar():boolean{
    if(this.usuarioLogeado.cod_usuario==this.senal.cod_usuario){
      return true;
    }else{
      var permisos=this.usuarioLogeado.permisos.filter(x=>x.cod_esp===this.cod_esp && x.cod_cop===this.cod_cop);
      if(permisos.length>0){
        return permisos[0].ind_admin;
      }
      return false;
    }
  }
  puedeBorrar():boolean{
    if(this.usuarioLogeado.cod_usuario==this.senal.cod_usuario 
      || this.usuarioLogeado.tip_usuario<=2){
      return true;
    }else{
      var permisos=this.usuarioLogeado.permisos.filter(x=>x.cod_esp===this.cod_esp && x.cod_cop===this.cod_cop);
      if(permisos.length>0){
        return permisos[0].ind_admin;
      }
      return false;
    }
  }

}

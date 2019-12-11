import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { SenalesItem } from '../../clases/senales-item';
import { Usuario } from  './../../clases/usuario';

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
  private papeleraVisible: boolean = false;
  


  @Input() senal:SenalesItem;
  private titulo:String= "";
  like(){
    console.warn("TODO esta funcion aun esta por hacer, te añadira como me gusta");
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
    
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
      this.admin = params['admin']==1;
    });

    this.cargarTituloPagina();
    this.esPropietario();
  }
  cargarTituloPagina(){
    console.warn("TODO esta funcion esta por hacer, cargara el titulo en la señal.")
  }

  tienePermisosPapelera():boolean{
    var permisos=this.usuarioLogeado.permisos.filter(x=>x.cod_esp===this.cod_esp && x.cod_cop===this.cod_cop);
    if(permisos.length>0){
      return permisos[0].ind_admin;
    }
    return false;
  }

  esPropietario(){
    if(this.senal.cod_usuario===this.usuarioLogeado.cod_usuario){
      this.papeleraVisible=true;
    } 

  }

}

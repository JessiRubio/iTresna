import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SenalesItem } from '../../clases/senales-item';
import { Usuario } from  './../../clases/usuario';

@Component({
  selector: 'app-senales',
  templateUrl: './senales.component.html',
  styleUrls: ['./senales.component.css']
})
export class SenalesComponent implements OnInit {

  private usuarioLogeado:Usuario;

  @Input() senal:SenalesItem;
  private titulo:String= "";
  like(){
    console.warn("TODO esta funcion aun esta por hacer, te añadira como me gusta");
  }

  constructor(private router:Router) {
    this.router.events.subscribe((ev)=>{
      if(localStorage.length==0){
        this.router.navigateByUrl("");
      }
    });
   }

  ngOnInit() {
    this.cargarTituloPagina();
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

}

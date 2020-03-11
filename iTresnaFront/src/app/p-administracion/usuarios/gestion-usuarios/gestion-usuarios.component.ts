import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../clases/usuario';
import {Organizacion} from '../../../clases/organizacion';
import {OrganizacionesService} from './../../../servicios/organizaciones.service';
@Component({
  selector: 'gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  private organizacion:Organizacion;
  private listaUsuarios:Usuario[]=[];
  constructor(
    private organizacionService:OrganizacionesService
  ) { }

  ngOnInit() {

    var usuario:Usuario=JSON.parse(localStorage.getItem("usuario"));
    console.log(usuario);
    this.iniciarDescargaDatos(usuario);
  }
  iniciarDescargaDatos(usuario:Usuario){
    this.cargarOrganizacion(usuario.cod_org);
  }
  cargarOrganizacion(cod_org:number){
    this.organizacionService.getOrganizacionActual(cod_org).subscribe(
      response=>{
        if(response.data==0){
          this.organizacion=response.organizacion;

        }else{
          //TODO Poner alerta error al cargar la organizacion
        }
      },
      error=>{
        //TODO Poner alerta error al cargar la organizacion
      }
    );
  }

}

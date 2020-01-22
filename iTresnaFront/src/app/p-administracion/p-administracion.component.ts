import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UsuariosService} from '../servicios/usuarios.service';
import { Usuario, Permiso } from '../clases/usuario';
import { Router } from '@angular/router';
import { OrganizacionesService } from '../servicios/organizaciones.service';
import { Organizacion } from '../clases/organizacion';

@Component({
  selector: 'app-p-administracion',
  templateUrl: './p-administracion.component.html',
  styleUrls: ['./p-administracion.component.css']
})
export class PAdministracionComponent implements OnInit{

  usuarioLogado:Usuario;
  organizacion:Organizacion;

  showespacios:boolean;
  showcops:boolean;
  showclasificatorios:boolean;
  showUsuarios:boolean;

  constructor(private organizacionService:OrganizacionesService,
    private router: Router
  ) {
    this.showespacios = false;
    this.showcops = false;
    this.showclasificatorios = false;
    this.showUsuarios= true; }

  ngOnInit() {
    if(localStorage.getItem("usuario")!=null){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      

      if(this.usuarioLogado.tip_usuario>2){
        this.router.navigateByUrl("Principal");
      }
    }
    this.cargarOrganizacion(this.usuarioLogado.cod_org);

  }

  cargarOrganizacion(cod_org:number){
    this.organizacionService.getOrganizacionActual(cod_org).subscribe(
      res =>{
        this.organizacion = res.organizacion;

      },
      err =>{
        console.log(err);
      }
    );
  }

  showEspacios(){
    this.showespacios = ! this.showespacios;
  }

  showCops(){
    this.showcops = !this.showcops;
  }

  showClasificatorio(){
    this.showclasificatorios = !this.showclasificatorios;
  }

  showUsuario(){
    this.showUsuarios = !this.showUsuarios;
  }



}
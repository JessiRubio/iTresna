import { Component, OnInit } from '@angular/core';
import { Organizacion } from '../clases/Organizacion';
import { Router } from '@angular/router';
import { OrganizacionesService} from '../servicios/organizaciones.service';
import { Usuario, Permiso } from '../clases/usuario';

@Component({
  selector: 'app-p-ad-organizaciones',
  templateUrl: './p-ad-organizaciones.component.html',
  styleUrls: ['./p-ad-organizaciones.component.css']
})
export class PAdOrganizacionesComponent implements OnInit {

  usuarioLogado:Usuario;
  listaOrganizacion:Organizacion[]=[];
  constructor(
    private organizacionesService:OrganizacionesService,
    private router: Router) 
    {

   }

  ngOnInit() {
    if(localStorage.length>0){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      this.cargarOrganizaciones();

      
    }else{
      this.router.navigateByUrl("");
    }
  }

  cargarOrganizaciones(){
    this.organizacionesService.getOrganizaciones()
        .subscribe(
          res =>{
            if(res.error == 0){
              this.listaOrganizacion=res.organizaciones;
              
            }
            else{
              
            }
          }, 
          err =>{ 
            console.log(err);

          } 
      );
  }


}

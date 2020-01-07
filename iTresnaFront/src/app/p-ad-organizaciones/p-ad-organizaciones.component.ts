import { Component, OnInit } from '@angular/core';
import { Organizacion } from '../clases/Organizacion';
import { Router } from '@angular/router';
import { OrganizacionesService} from '../servicios/organizaciones.service';
import { UsuariosService} from '../servicios/usuarios.service';
import { Usuario, Permiso } from '../clases/usuario';

@Component({
  selector: 'app-p-ad-organizaciones',
  templateUrl: './p-ad-organizaciones.component.html',
  styleUrls: ['./p-ad-organizaciones.component.css']
})
export class PAdOrganizacionesComponent implements OnInit {

  usuarioLogado:Usuario;
  listaOrganizacion:Organizacion[]=[];
  currentItem;
  organizacion:Organizacion;
  constructor(
    private organizacionesService:OrganizacionesService,
    private router: Router) 
    {

   }

  ngOnInit() {
    if(localStorage.getItem("usuario")!=null){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      if(this.usuarioLogado.tip_usuario==1){
        this.router.navigateByUrl("Organizaciones");
      }else{
        this.router.navigateByUrl("Principal");
      }
    }
    
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

  async setItem(item){
    if (this.currentItem === item) return;
    console.log(this.currentItem);
    this.currentItem = item;
    this.usuarioLogado.cod_org=this.currentItem.cod_org;
    let string=await JSON.stringify(this.usuarioLogado);
    await localStorage.setItem("usuario",string);
    await this.guardarOrganizacion();
    this.router.navigateByUrl("Administracion");
  }
  
  guardarOrganizacion(){
    localStorage.setItem("organizacion", JSON.stringify(this.currentItem));
  }


}

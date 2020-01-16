import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Organizacion } from '../../clases/organizacion';
import { Usuario } from '../../clases/usuario';
import {OrganizacionesService} from './../../servicios/organizaciones.service';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css']
})
export class OrganizacionComponent implements OnInit {
  private form:FormGroup;
  private usuarioLogeado:Usuario;
  organizacion:Organizacion;
  img:string="";

  constructor(private fBuilder: FormBuilder,
    private organizacionesService:OrganizacionesService) {
      this.form=this.fBuilder.group({
        orgName:["",Validators.required],
        orgDesc:["",Validators.required],
        contacto:["",Validators.required],
        orgIcon:new FormControl(null)
      });
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.cargarOrg(this.usuarioLogeado.cod_org);
  }
  cargarOrg(cod_org:number){
    this.organizacionesService.getOrganizacionActual(this.usuarioLogeado.cod_org).subscribe(
      response=>{
        this.organizacion=response.organizacion;
        this.form=this.fBuilder.group({
          orgName:[this.organizacion.desc_org,Validators.required],
          orgDesc:[this.organizacion.eslogan_org,Validators.required],
          contacto:[this.organizacion.contacto,Validators.required],
          orgIcon:new FormControl(null)
        });
    
        this.img=this.organizacion.img_org;
      }
    );
  }
  ngOnInit() {
    
  }
}

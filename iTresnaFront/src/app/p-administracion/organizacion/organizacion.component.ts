import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Organizacion } from '../../clases/organizacion';
import { Usuario } from '../../clases/usuario';
import {OrganizacionesService} from './../../servicios/organizaciones.service';
import { TouchSequence } from 'selenium-webdriver';
import { of } from 'rxjs';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css']
})
export class OrganizacionComponent implements OnInit {
  form:FormGroup;
  private usuarioLogeado:Usuario;
  private editar:boolean=true;
  organizacion:Organizacion;
  usuarios:string[]=[];
  img:string="";
  url:string="";
  placeHolder:string;

  constructor(private fBuilder: FormBuilder,
    private organizacionesService:OrganizacionesService) {
      this.organizacion=new Organizacion();
      this.form=this.fBuilder.group({
        orgName:["",Validators.required],
        orgDesc:["",Validators.required],
        enlace:["",Validators.required],
        imagen:new FormControl()
      });
      this.form.disable();    
    
  }
  async cargarOrg(cod_org:number){
    this.organizacionesService.getOrganizacionActual(this.usuarioLogeado.cod_org).subscribe(
      response=>{
          this.organizacion=response.organizacion;
          this.img=this.organizacion.img_org;
          this.url=this.organizacion.enlace_org;
          this.usuarios=this.organizacion.usuarios;
          this.form.controls["orgName"].setValue(this.organizacion.desc_org);
          this.form.controls["orgDesc"].setValue(this.organizacion.eslogan_org);
          this.form.controls["enlace"].setValue(this.organizacion.enlace_org);
      }
    );
  }
  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.cargarOrg(this.usuarioLogeado.cod_org);
    
  }
}
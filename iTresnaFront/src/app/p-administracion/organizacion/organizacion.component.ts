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
  private form:FormGroup;
  private usuarioLogeado:Usuario;
  
  organizacion:Organizacion;
  usuarios:string[]=[];
  img:string="";
  url:string="";

  deshabilitado:boolean=true;
  constructor(private fBuilder: FormBuilder,
    private organizacionesService:OrganizacionesService) {
      this.form=this.fBuilder.group({
        orgName:["",Validators.required],
        orgDesc:["",Validators.required],
        contacto:["",Validators.required],
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
          this.form.controls["contacto"].setValue(this.usuarios.indexOf(this.organizacion.contacto));
      }
    );
  }
  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.cargarOrg(this.usuarioLogeado.cod_org);
    
  }
  editarOrganizacion(){
    this.deshabilitado=!this.deshabilitado;
    if(this.deshabilitado){
      this.organizacion.desc_org=this.form.value.orgName;
      this.organizacion.eslogan_org=this.form.value.orgDesc;
      this.organizacion.contacto=this.usuarios[this.form.value.contacto];
      var imagen = this.form.value["imagen"];
      if(imagen!=null){
        var reader = new FileReader();
        reader.readAsDataURL(imagen.files[0]);
        reader.onload = () =>{
          this.modificar(this.organizacion.cod_org,this.organizacion.desc_org,
                        this.organizacion.eslogan_org,this.organizacion.contacto,
                        this.organizacion.enlace_org,
                        reader.result.toString().split(',')[1]);
        };
      }else{
        this.modificar(this.organizacion.cod_org,this.organizacion.desc_org,
          this.organizacion.eslogan_org,this.organizacion.contacto,
          this.organizacion.enlace_org,"");
      }
      
      this.form.disable();
    }else{
      this.form.enable();
      if(this.usuarioLogeado.tip_usuario==2)
        this.form.controls["contacto"].disable();
    }
  }
  private modificar(cod_org:number,desc_org:string,eslogan:string,contacto:string,enlace:string,imagen:string){
    this.organizacionesService.modificarOrganizacion(cod_org,desc_org,eslogan,contacto,enlace,imagen).subscribe(
      response=>{
        if(response.error==0){
          location.reload();
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
}

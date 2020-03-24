import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Usuario } from '../../clases/usuario';

import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Alerta } from '../../clases/alerta'
import { NgbModal, NgbModalOptions, NgbModalRef, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertGenericoComponent } from '../../alert-generico/alert-generico.component';
import { ModalServiceService } from '../../servicios/modal-service.service';

@Component({
  selector: 'app-p-perfil',
  templateUrl: './p-perfil.component.html',
  styleUrls: ['./p-perfil.component.css']
})
export class PPerfilComponent implements OnInit {

  form:FormGroup;
  usuarioLogeado:Usuario;
  placeHolder:string;
  deshabilitado:boolean=true;
  cod_usuarioAnterior:string;

  constructor(private fBuilder: FormBuilder,
    private alertModalService:NgbModal,
    private modalService:ModalServiceService,
    private usuarioService:UsuariosService
    ) {
      
    }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.form=this.fBuilder.group({
      nombreUsu:[this.usuarioLogeado.nombre,Validators.required],
      ape1Usu:[this.usuarioLogeado.ape1,Validators.required],
      ape2Usu:[this.usuarioLogeado.ape2,Validators.required],
      emailUsu:[this.usuarioLogeado.cod_usuario,Validators.required]
    });
    this.form.disable();  
    this.cod_usuarioAnterior=this.usuarioLogeado.cod_usuario;

  }


  private abrirModal(usuarioLogeado):Promise<any>{
    var data=[
      {
        input:"passwordField",
        controlName:"sarbideActual",
        placeHolder:"Contraseña actual",
        data:""
      },
      {
        input:"passwordField",
        controlName:"sarbideNueva",
        placeHolder:"Contraseña nueva",
        data:""
      },
      {
        input:"passwordField",
        controlName:"sarbideNuevaRepeticion",
        placeHolder:"Repetir contraseña nueva",
        data:""
      }
    ];
    var config={
      data:data,
      titulo:"Cambiar Contraseña",
      botonFin:"Cambiar"
    }
    return this.modalService.abrirModal(config);
  }
  modificarContrasena(){
    this.abrirModal(this.usuarioLogeado).then(
      data=>{
        if(data!=null ){

          if(data.sarbideActual===this.usuarioLogeado.sarbidea && data.sarbideNueva!="" && data.sarbideNueva.length>3 
          && data.sarbideNueva===data.sarbideNuevaRepeticion){
            this.modificarContrasenas(data.sarbideNueva,this.usuarioLogeado.cod_org, this.usuarioLogeado.cod_usuario);
          }else{
            let alert:Alerta = {
              message:"Datos erroneos", 
              type:'danger'
            };
            this.abrirAlerta(alert);
          }
        }
      },
      error=>{
        //Nos da igual que se cierre el modal
      }
    );

}

  modificarContrasenas(sarbideNueva,cod_org ,cod_usuario){
    this.usuarioService.modificarContrasena(sarbideNueva,cod_org,cod_usuario)
      .subscribe(
        response=>{
          console.log(response);
          let alert:Alerta = {
              message:"Contraseña modificada, redirigiendo", 
              type:'success'
            };
          this.abrirAlerta(alert);

          setTimeout(() => { 
            this.usuarioService.logout();
            this.cerrarAlerta(alert);
          }, 3000);
          
        },
        error=>{
          //TODO Alert verifica que siempre es la misma respues de error con el servidor  
          let alert:Alerta = {
            message:"Error con el servidor", 
            type:'danger'
          };
        this.abrirAlerta(alert);
        }
      );
  
  }


  abrirAlerta(alerta:Alerta){
    let modalRef:NgbModalRef;
    modalRef=this.alertModalService.open(AlertGenericoComponent, {centered:true});
    (<AlertGenericoComponent>modalRef.componentInstance).alert=alerta;
  }

  cerrarAlerta(alerta:Alerta){
    this.alertModalService.dismissAll(AlertGenericoComponent);
  }



  editarPerfil(){
    this.deshabilitado=!this.deshabilitado;
    if(this.deshabilitado){
      if(!this.form.pristine && this.form.dirty){
        this.usuarioLogeado.nombre=this.form.value.nombreUsu;
        this.usuarioLogeado.ape1=this.form.value.ape1Usu;
        this.usuarioLogeado.ape2=this.form.value.ape2Usu;
        this.usuarioLogeado.cod_usuario=this.form.value.emailUsu;
      
        this.modificarPerfil(this.usuarioLogeado.nombre,this.usuarioLogeado.ape1,
          this.usuarioLogeado.ape2,this.usuarioLogeado.cod_usuario,this.cod_usuarioAnterior, this.usuarioLogeado.cod_org);
        
      }
      this.form.disable();
    }else{
      this.form.enable();
    }
  }

  private modificarPerfil(nombre,ape1,ape2,cod_usuario,cod_usuarioAnterior,cod_org){
    this.usuarioService.modificarPerfil(nombre,ape1,ape2,cod_usuario,cod_usuarioAnterior,cod_org, []).subscribe(
      response=>{
        this.usuarioLogeado.nombre=nombre;
        this.usuarioLogeado.ape1=ape1;
        this.usuarioLogeado.ape2=ape2;
        this.usuarioLogeado.cod_usuario=cod_usuario;
        localStorage.setItem("usuario",JSON.stringify(this.usuarioLogeado));
      },
      error=>{
        console.log(error);
      }
    );
  }
}

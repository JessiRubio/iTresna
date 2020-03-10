import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { Observable } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ModalAdminCopsComponent } from 'src/app/modal-admin-cops/modal-admin-cops.component';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Alerta } from '../../clases/alerta'
import { NgbModal, NgbModalOptions, NgbModalRef, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertGenericoComponent } from '../../alert-generico/alert-generico.component';

@Component({
  selector: 'app-p-perfil',
  templateUrl: './p-perfil.component.html',
  styleUrls: ['./p-perfil.component.css']
})
export class PPerfilComponent implements OnInit {

  form:FormGroup;
  usuarioLogeado:Usuario;
  placeHolder:string;
  sarbideActual:string;
  sarbideNueva:string;
  deshabilitado:boolean=true;
  cod_usuarioAnterior:string;

  constructor(private fBuilder: FormBuilder,
    private dialog:MatDialog,
    private modalService:NgbModal,
    private usuarioService:UsuariosService
    ) {
      this.form=this.fBuilder.group({
        nombreUsu:["",Validators.required],
        ape1Usu:["",Validators.required],
        ape2Usu:["",Validators.required],
        emailUsu:["",Validators.required]
      });
      this.form.disable();
    }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));

    this.form.controls["nombreUsu"].setValue(this.usuarioLogeado.nombre);
    this.form.controls["ape1Usu"].setValue(this.usuarioLogeado.ape1);
    this.form.controls["ape2Usu"].setValue(this.usuarioLogeado.ape2);
    this.form.controls["emailUsu"].setValue(this.usuarioLogeado.cod_usuario);
    this.cod_usuarioAnterior=this.usuarioLogeado.cod_usuario;

  }




  openModalModificarContrasena(usuarioLogeado):Observable<any>{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.minWidth="50%";
    dialogConfig.data=[
      
      {
        input:"passwordField",
        controlName:"sarbideActual",
        placeHolder:"Contraseña actual",
        data:{
          desc:this.sarbideActual
        }
      },
      {
        input:"passwordField",
        controlName:"sarbideNueva",
        placeHolder:"Nueva contraseña",
        data:{
          desc:this.sarbideNueva
        }
      },
    ];
    const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
    return dialogRef.afterClosed();
  }


  modificarContrasena(){

    this.openModalModificarContrasena(this.usuarioLogeado).subscribe(
      data=>{
        if(data!=null){

          if(data.sarbideActual===this.usuarioLogeado.sarbidea){
            this.modificarContrasenas(data.sarbideNueva,this.usuarioLogeado.cod_org, this.usuarioLogeado.cod_usuario);
            
          }else{
            let alert:Alerta = {
              message:"Datos erroneos", 
              type:'danger'
            };
            this.abrirAlerta(alert);
          }

        }else{
            if(data.sarbideActual===this.usuarioLogeado.sarbidea){
              this.modificarContrasenas(data.sarbideNueva,this.usuarioLogeado.cod_org, this.usuarioLogeado.cod_usuario);
  
            }else{
              let alert:Alerta = {
                message:"Datos erroneos", 
                type:'danger'
              };
              this.abrirAlerta(alert);
            }
            
          }
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
          console.log(error);
        }
      );
  
  }


  abrirAlerta(alerta:Alerta){
    let modalRef:NgbModalRef;
    modalRef=this.modalService.open(AlertGenericoComponent, {centered:true});
    (<AlertGenericoComponent>modalRef.componentInstance).alert=alerta;
  }

  cerrarAlerta(alerta:Alerta){
    let modalRef:NgbModalRef;
    this.modalService.dismissAll(AlertGenericoComponent);
    (<AlertGenericoComponent>modalRef.componentInstance).alert=alerta;
  }



  editarPerfil(){
    this.deshabilitado=!this.deshabilitado;
    if(this.deshabilitado){
      this.usuarioLogeado.nombre=this.form.value.nombreUsu;
      this.usuarioLogeado.ape1=this.form.value.ape1Usu;
      this.usuarioLogeado.ape2=this.form.value.ape2Usu;
      this.usuarioLogeado.cod_usuario=this.form.value.emailUsu;
     
      this.modificarPerfil(this.usuarioLogeado.nombre,this.usuarioLogeado.ape1,
        this.usuarioLogeado.ape2,this.usuarioLogeado.cod_usuario,this.cod_usuarioAnterior, this.usuarioLogeado.cod_org );
      
      
      this.form.disable();
    }else{
      this.form.enable();
    }
  }

  private modificarPerfil(nombre,ape1,ape2,cod_usuario,cod_usuarioAnterior,cod_org){
    this.usuarioService.modificarPerfil(nombre,ape1,ape2,cod_usuario,cod_usuarioAnterior,cod_org).subscribe(
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

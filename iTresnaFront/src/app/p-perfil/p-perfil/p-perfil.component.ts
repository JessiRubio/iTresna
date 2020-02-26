import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { Observable } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ModalAdminCopsComponent } from 'src/app/modal-admin-cops/modal-admin-cops.component';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Alerta } from '../../clases/alerta'

@Component({
  selector: 'app-p-perfil',
  templateUrl: './p-perfil.component.html',
  styleUrls: ['./p-perfil.component.css']
})
export class PPerfilComponent implements OnInit {

  form:FormGroup;
  private usuarioLogeado:Usuario;
  placeHolder:string;
  sarbideActual:string;
  sarbideNueva:string;

  constructor(private fBuilder: FormBuilder,
    private dialog:MatDialog,
    private usuarioService:UsuariosService
    ) {

    this.form=this.fBuilder.group({
      usuName:["",Validators.required],
      ape1Usu:["",Validators.required],
      ape2Usu:["",Validators.required],
      emailUsu:["",Validators.required]
    });
    this.form.disable();



   }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));

    this.form.controls["usuName"].setValue(this.usuarioLogeado.nombre);
    this.form.controls["ape1Usu"].setValue(this.usuarioLogeado.ape1);
    this.form.controls["ape2Usu"].setValue(this.usuarioLogeado.ape2);
    this.form.controls["emailUsu"].setValue(this.usuarioLogeado.cod_usuario);
  }




  openModalModificarContrasena(usuarioLogeado:Usuario):Observable<any>{
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


  modificarContrasena(usuarioLogeado:Usuario){

    this.openModalModificarContrasena(usuarioLogeado).subscribe(
      data=>{
        if(data!=null){

          if(data.sarbideActual===this.usuarioLogeado.sarbidea){
            this.modificarContrasenas(data.sarbideNueva,this.usuarioLogeado.cod_org, this.usuarioLogeado.cod_usuario);
            

          }else{
            window.alert("Datos erroneos");
          }

        }else{
            if(data.sarbideActual===this.usuarioLogeado.sarbidea){
              this.modificarContrasenas(data.sarbideNueva,this.usuarioLogeado.cod_org, this.usuarioLogeado.cod_usuario);
  
  
            }else{
              window.alert("Datos erroneos");
            }
            
            
          }
        }
      
    );

}

modificarContrasenas(sarbideNueva,cod_org ,cod_usuario){
      
  if(sarbideNueva==""){
    window.alert("Rellena los campos");

  }else{
    console.log(sarbideNueva);
    
    this.usuarioService.modificarContrasena(sarbideNueva,cod_org,cod_usuario)
      .subscribe(
        response=>{
          console.log(response);
          this.usuarioService.logout();
        },
        error=>{
          console.log(error);
        }
      );
  
    
    } 
  }




}

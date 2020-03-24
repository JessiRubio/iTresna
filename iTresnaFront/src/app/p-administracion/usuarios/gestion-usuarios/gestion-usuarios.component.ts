import { Component, OnInit } from '@angular/core';
import {Usuario, ClasificacionUsuario} from '../../../clases/usuario';
import {Organizacion} from '../../../clases/organizacion';
import {OrganizacionesService} from './../../../servicios/organizaciones.service';
import { UsuariosService } from './../../../servicios/usuarios.service';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { ModalServiceService } from '../../../servicios/modal-service.service';
import { Observable } from 'rxjs';
import { Alerta } from '../../../clases/alerta';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AlertService } from '../../../servicios/alert.service';

@Component({
  selector: 'gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  private organizacion:Organizacion;
  private listaUsuarios:Usuario[]=[];
  constructor(
    private organizacionService:OrganizacionesService,
    private usuariosService:UsuariosService,
    private modalService:ModalServiceService,
    private alertaService:AlertService
  ) { }

  ngOnInit() {
    var usuario:Usuario=JSON.parse(localStorage.getItem("usuario"));
    this.cargarOrganizacion(usuario.cod_org);
  }
  private cargarOrganizacion(cod_org:number){
    this.listaUsuarios=[];
    this.organizacionService.getOrganizacionActual(cod_org).subscribe(
      response=>{
        if(response.error==0){
          this.organizacion=response.organizacion;
          this.organizacion.usuarios.forEach(usuario=>this.cargarUsuarios(usuario));
        }else{
          var alert:Alerta={
            message:"No se ha podido cargar los datos.",
            type:"warning"
          }
          this.abrirAlerta(alert);
        }
      },
      error=>{
        var alert:Alerta={
          message:"Error con el servidor.",
          type:"danger"
        }
        this.abrirAlerta(alert);
      }
    );
  }
  private cargarUsuarios(cod_usuario:string){
    this.usuariosService.getUsuarioPorCodUsuario(cod_usuario).subscribe(
      response=>{
        if(response.error==0){
          this.listaUsuarios.push(response.usuario);
          this.listaUsuarios.forEach(x=>this.ordenarClasificacionSegunOrg(x));
        }
      },
      error=>{
        var alert:Alerta={
          message:"Error con el servidor.",
          type:"danger"
        }
        this.abrirAlerta(alert);
      }
    );
  }
  ordenarClasificacionSegunOrg(usuario:Usuario){
    if(usuario.clasificacion!=null){
      var listaClasificacion=new Array<ClasificacionUsuario>();
      this.organizacion.clasificacion.forEach(x=>{
          var aux=usuario.clasificacion.find(clasifiacion=>clasifiacion.tip_clasificacion===x.clasificacion);
          if(aux!=null){
            listaClasificacion.push(aux);
          }else{
            listaClasificacion.push(new ClasificacionUsuario());
          }
        }
      );
      usuario.clasificacion=listaClasificacion;
    }
    else{
      usuario.clasificacion=[];
      this.ordenarClasificacionSegunOrg(usuario);
    }
   
  }

  private abrirModal(usuario:Usuario,titulo:string,botonFin:string):Promise<any>{
    var data:any[]=[
      {
        input:"inputField",
        controlName:"email",
        placeHolder:"Escribe el email del usuario",
        data:usuario.cod_usuario
      },
      {
        input:"inputField",
        controlName:"nombre",
        placeHolder:"Escribe el nombre del usuario",
        data:usuario.nombre
      },
      {
        input:"inputField",
        controlName:"ape1",
        placeHolder:"Escribe el primer apellido del usuario",
        data:usuario.ape1
      },
      {
        input:"inputField",
        controlName:"ape2",
        placeHolder:"Escribe el segundo apellido del usuario",
        data:usuario.ape2
      },
      
    ];
    for(var i=0;i<this.organizacion.clasificacion.length;i++){
      let clasi=this.organizacion.clasificacion[i];
      if(usuario.clasificacion.length<i+1){
        data.push(
          {
            input:"selectField",
            controlName:"clas"+(i+1),
            placeHolder:"Selecciona un dato clasificatorio de "+clasi.clasificacion,
            data:{
              data:clasi.categorias,
              seleccionado:""
            }
          }
        );
      }else{
        data.push(
          {
            input:"selectField",
            controlName:"clas"+(i+1),
            placeHolder:"Selecciona un dato clasificatorio de "+clasi.clasificacion,
            data:{
              data:clasi.categorias,
              seleccionado:usuario.clasificacion[i].categoria
            }
          }
        );
      }
      
    }
    var conf={
      data:data,
      titulo:titulo,
      botonFin:botonFin
    };
    return this.modalService.abrirModal(conf);
  }
  editar(usuario:Usuario){
    this.abrirModal(usuario,"Modificar Usuario","Modificar").then(
      async data=>{
        if(data!=null){
          var datosClasificatorios:Array<any>=new Array();
          for(var i = 0; i<this.organizacion.clasificacion.length;i++){
            if(data["clas"+(i+1)]!=""){
              datosClasificatorios.push(
                {
                  clasificacion:this.organizacion.clasificacion[i].clasificacion,
                  categoria:data["clas"+(i+1)]
                }
              );
            }
          }
          this.editarPerfil(data.email,data.nombre,data.ape1,
            data.ape2,usuario.cod_usuario,usuario.cod_org,datosClasificatorios);
        }
      },
      error=>{
        //Nos da igual que se cierre el modal
      }
    );
  }
  
  private async editarPerfil(cod_usuario:string,nombre:string,ape1:string,
    ape2:string,cod_usuario_anterior:string,cod_org:number,datosClasificatorios:any[]){
      this.usuariosService.modificarPerfil(nombre,ape1,ape2,cod_usuario,
        cod_usuario_anterior,cod_org,datosClasificatorios).subscribe(
          response=>{
            var alerta:Alerta;
            if(response.error==0){
              alerta={
                message:"Perfil modificado con existo",
                type:"success"
              }              
              this.cargarOrganizacion(this.organizacion.cod_org);
            }
            else{
              alerta={
                message:"No se ha podido modificar el perfil correctamente",
                type:"warning"
              }
            }
            this.abrirAlerta(alerta);
          },
          error=>{
            let alerta:Alerta;
            alerta={
              message:"Error con el servidor",
              type:"danger"
            }
            this.abrirAlerta(alerta);
            console.log(error);
          }
        );
  }
  nuevo(){
    var usuario=new Usuario();
    usuario.clasificacion=new Array<ClasificacionUsuario>();
    this.abrirModal(usuario,"Alta Usuario","Alta").then(
      async data=>{
        if(data!=null){
          var datosClasificatorios:Array<any>=[];
          for(var i = 0; i<this.organizacion.clasificacion.length;i++){
            if(data["clas"+(i+1)]!=""){
              datosClasificatorios.push(
                {
                  clasificacion:this.organizacion.clasificacion[i].clasificacion,
                  categoria:data["clas"+(i+1)]
                }
              );
            }
          }
          this.altaUsuario(data.email,data.nombre,data.ape1,data.ape2,this.organizacion.cod_org,datosClasificatorios);
        }
      },
      error=>{
        //Nos da igual que se cierre el modal
      }
    );
  }
  private async altaUsuario(cod_usuario:string,nombre:string,ape1:string,
    ape2:string,cod_org:number,datosClasificatorios:any[]){
      this.usuariosService.nuevoUsuario(cod_usuario,3,cod_org,"123",nombre,ape1,ape2,datosClasificatorios)
      .subscribe(
        response=>{
          var alert:Alerta;
          if(response.error==0){
            alert={
              message:"Usuario añadido con exito.",
              type:"success"
            }
            this.cargarOrganizacion(this.organizacion.cod_org);
          }else if(response.error==2){
            alert={
              message:"Ya existe un usuario con ese correo electronico.",
              type:"warning"
            }
          }else{
            alert={
              message:"Hubo fallos al crear el usuario.",
              type:"warning"
            }
            this.cargarOrganizacion(this.organizacion.cod_org);
          }
          this.abrirAlerta(alert);
        },
        error=>{
          var alert:Alerta={
            message:"Error con el servidor.",
            type:"danger"
          }
          this.abrirAlerta(alert);
          console.log(error);
        }
      );
  }

  borrar(usuario:Usuario){
    var config:{titulo:string,label:string,botonFin:string,botonCancel:string};
    config={
      botonCancel:"Cancelar",
      botonFin:"Aceptar",
      titulo:"Borrar",
      label:"¿Estas seguro de eliminar el usuario seleccionado?"
    }
    this.modalService.abrirModalTexto(config).then(
      data=>{
        this.usuariosService.eliminarUsuario(usuario.cod_usuario,usuario.cod_org)
          .subscribe(
            response=>{
              var alert:Alerta;
              if(response.error==0){
                alert={
                  message:"El usuario se ha borrado",
                  type:"success"
                }
                this.cargarOrganizacion(this.organizacion.cod_org);
              }
              else{
                alert={
                  message:"El usuario no se ha podido borrar",
                  type:"warning"
                }
              }
              this.abrirAlerta(alert);
            },
            error=>{
              var alert:Alerta;
              alert={
                message:"Error con el servidor",
                type:"danger"
              }
              this.abrirAlerta(alert);
            }
          );
      }
    );
  }
  private abrirAlerta(alert:Alerta){
    this.alertaService.abrirAlerta(alert);
  }
}

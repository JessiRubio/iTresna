import { Component, OnInit } from '@angular/core';
import {Usuario, ClasificacionUsuario} from '../../../clases/usuario';
import {Organizacion} from '../../../clases/organizacion';
import {OrganizacionesService} from './../../../servicios/organizaciones.service';
import { UsuariosService } from './../../../servicios/usuarios.service';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { ModalServiceService } from '../../../servicios/modal-service.service';
import { Observable } from 'rxjs';
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
    private modalService:ModalServiceService
  ) { }

  ngOnInit() {

    var usuario:Usuario=JSON.parse(localStorage.getItem("usuario"));
    this.iniciarDescargaDatos(usuario);
  }
  private iniciarDescargaDatos(usuario:Usuario){
    this.cargarOrganizacion(usuario.cod_org);
  }
  private cargarOrganizacion(cod_org:number){
    this.organizacionService.getOrganizacionActual(cod_org).subscribe(
      response=>{
        if(response.error==0){
          this.organizacion=response.organizacion;
          this.organizacion.usuarios.forEach(usuario=>this.cargarUsuarios(usuario));
        }else{
          //TODO Poner alerta error al cargar la organizacion
        }
      },
      error=>{
        //TODO Poner alerta error al cargar la organizacion
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
        //TODO alerta
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

  abrirModal(usuario:Usuario,titulo:string,botonFin:string):Promise<any>{
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
          await this.editarPerfil(data.email,data.nombre,data.ape1,
            data.ape2,usuario.cod_usuario,usuario.cod_org);
            
          for(var i = 0; i<this.organizacion.clasificacion.length;i++){
            this.editarDatosClasificatoriosUsuario(usuario.cod_usuario,
              this.organizacion.cod_org,this.organizacion.clasificacion[i].clasificacion,data["clas"+(i+1)]);
          }
        }
      },
      error=>{
        //Nos da igual que se cierre el modal
      }
    );
  }
  private editarDatosClasificatoriosUsuario(cod_usuario:string,cod_org:number,tip_clasif:string,categoria:string){
    this.usuariosService.modificarDatosClasificatorios(cod_usuario,cod_org,
      tip_clasif,categoria).subscribe(
        response=>{
          if(response==0){
            //TODO Alert
            
          }else{
            //TODO Alert
          }
        },
        error=>{
          //TODO Alert
        }
      )
  }
  private async editarPerfil(cod_usuario:string,nombre:string,ape1:string,
    ape2:string,cod_usuario_anterior:string,cod_org:number):Promise<any>{
      var obser:Observable<any>= this.usuariosService.modificarPerfil(nombre,ape1,ape2,cod_usuario,
        cod_usuario_anterior,cod_org);
        obser.subscribe(
          response=>{
            if(response.error==0){
              //TODO Alert
            }
            else{
              //TODO Alert
            }
          },
          error=>{
            //TODO ALERT
          }
        );
      return obser.toPromise();
  }
  nuevo(){
    var usuario=new Usuario();
    usuario.clasificacion=new Array<ClasificacionUsuario>();
    this.abrirModal(usuario,"Alta Usuario","Alta").then(
      async data=>{
        if(data!=null){
          await this.altaUsuario(data.email,data.nombre,data.ape1,data.ape2,this.organizacion.cod_org);
          for(var i = 0; i<this.organizacion.clasificacion.length;i++){
            this.editarDatosClasificatoriosUsuario(data.email,
              this.organizacion.cod_org,this.organizacion.clasificacion[i].clasificacion,data["clas"+(i+1)]);
          }
        }
      },
      error=>{
        //Nos da igual que se cierre el modal
      }
    );
  }
  private async altaUsuario(cod_usuario:string,nombre:string,ape1:string,
    ape2:string,cod_org:number):Promise<any>{
      var obser:Observable<any> = this.usuariosService.nuevoUsuario(cod_usuario,3,cod_org,"123",nombre,ape1,ape2);
      this.usuariosService.nuevoUsuario(cod_usuario,3,cod_org,"123",nombre,ape1,ape2)
      .subscribe(
        response=>{
          if(response.error=0){
            //TODO Alert
          }
          else{
            //TODO Alert
          }
        },
        error=>{
          //TODO Alert
        }
      );
      return obser.toPromise();
  }

  borrar(usuario:Usuario){
    
  }

}

import { Component, OnInit } from '@angular/core';
import { CopsItem } from '../../clases/copsitem';
import { CopsService } from '../../servicios/cops.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario, Permiso } from '../../clases/usuario';
import { Organizacion, Categorias } from '../../clases/organizacion';
import { OrganizacionesService } from '../../servicios/organizaciones.service';
import { EspaciosService } from '../../servicios/espacios.service';
import { EspaciosItem } from '../../clases/espaciosItem';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalAdminCopsComponent } from './../../modal-admin-cops/modal-admin-cops.component';
import { Observable } from 'rxjs';
import {ModalServiceService} from '../../servicios/modal-service.service'
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listaEspacios:EspaciosItem[] = []
  listaCops:CopsItem[] = [];
  listaUsuarios:Usuario[];
  listaCategorias:Categorias[] = [];
  listaClasificacion =[] = [];
  listaPermisos:Permiso[];
  cops:CopsItem[]=[];
 

  organizacion:Organizacion;
  usuarioLogado:Usuario;
  show:boolean = false;
  showCops:boolean = false;
  showTabla:boolean = false;

  ind_admin:number;
  selected:string = "";
  selectedCategoria:Categorias = null;
  selectedEspacio:EspaciosItem = null;
  selectedCop:CopsItem = null;
  cod_espPermiso:number;
  cod_copPermiso:number;


  permisos:boolean;
  usuarios:boolean;
  checked:boolean =false;
  esUsuario:boolean;
  marked = false;


  constructor( private copsService:CopsService,
              private espaciosService:EspaciosService,
              private usuarioService:UsuariosService,
              private organizacionService:OrganizacionesService,
              private dialog:MatDialog,
              private modalService:ModalServiceService) 
  {
    this.permisos=false;
    this.usuarios=false;
  }

  ngOnInit() {
    this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
    this.organizacionService.getOrganizacionActual(this.usuarioLogado.cod_org).subscribe(
      response=>{
        this.organizacion=response.organizacion;
        this.listaClasificacion[0] =this.organizacion.clasif1;
        this.listaClasificacion[1] =this.organizacion.clasif2;
        this.listaClasificacion[2] =this.organizacion.clasif3;

        this.cargarEspacios(this.organizacion.cod_org);
      },
      error=>{

      }
    )
    
  }

  filtrarCategorias(clasificacion:string){
    this.show = true;
    this.listaCategorias = [];
    for(var pos=0;pos<this.organizacion.categorias.length;pos++){
      if (this.organizacion.categorias[pos].tip_clasificacion===clasificacion){
        this.listaCategorias.push(this.organizacion.categorias[pos]);
      }
    }

  }

  cargarEspacios(cod_org:number){
    this.espaciosService.getEspacios(cod_org).subscribe(
      res=>{
        this.listaEspacios = res.espacios
      },
      err=>{
        console.log(err);
      }
    );
  }

  

  cargarCops(espacio:EspaciosItem){
    var esp:EspaciosItem;
    for(var pos=0;pos<this.listaEspacios.length;pos++){

      if(this.listaEspacios[pos].desc_esp===espacio.desc_esp){
        esp = this.listaEspacios[pos];
        break;
      }
    }

    this.cod_espPermiso=espacio.cod_esp;

    this.descargarCops(esp);
    this.showCops = true;
  }

  descargarCops(esp:EspaciosItem){
    this.copsService.getCops(this.organizacion.cod_org,esp.cod_esp,this.usuarioLogado.cod_usuario).subscribe(
      res=>{
        this.listaCops = res.cops;
      },
      err=>{
        console.log(err);
      }
    );
  }


  cargarUsuarios(){

    this.usuarioService.getUsuarios(this.organizacion.cod_org).subscribe(
      res=>{
        this.listaUsuarios= res.usuarios;
      },
      err=>{

      }
    );
    
  }

  
  cargarTabla(cop:CopsItem){
    this.selectedCop = cop;
    this.cargarUsuarios();
    this.showTabla = true;
    this.cod_copPermiso=cop.cod_cop;
    
    
  }

  pruebaUso(listaUsuarios:Usuario){
    if(listaUsuarios.permisos.length===0){

      return false;
    

    }else{
     
      return true;
      
    } 
  
  
  }


  pruebaAdmin(listaUsuarios:Usuario){

    if(listaUsuarios.permisos.length===0){

     
     
      return false;
    

    }else{
      
     if(listaUsuarios.permisos[0].ind_admin==true){
      
      return true;
      
    }else{
      return false;
      }
    } 
    
   
  
  }



  checkedAdmin(e,listaUsuarios:Usuario){

    this.ind_admin=0;
    this.usuarioService.modificarPermisos(listaUsuarios.cod_usuario,listaUsuarios.cod_org,this.ind_admin)
    .subscribe(
      response=>{
        
        location.reload();
      },
      error=>{
        
      }
    );
  }


  uncheckedAdmin(e,listaUsuarios:Usuario){

    this.ind_admin=1;

    if(listaUsuarios.permisos.length===0){

      this.usuarioService.nuevoPermisos(listaUsuarios.cod_usuario,
        this.cod_copPermiso, this.cod_espPermiso,
        listaUsuarios.cod_org,this.ind_admin).subscribe(
          response=>{
            
            location.reload();
          },
          error=>{
            
          }
      );
    }else{
      this.usuarioService.modificarPermisos(listaUsuarios.cod_usuario,
        listaUsuarios.cod_org,this.ind_admin).subscribe(
          response=>{
            
            location.reload();
          },
          error=>{
            
          }
        );
    }
  }
  checkedUso(e,listaUsuarios:Usuario){

    this.usuarioService.borrarPermisos(listaUsuarios.cod_usuario,this.cod_copPermiso, this.cod_espPermiso,listaUsuarios.cod_org,this.ind_admin)
    .subscribe(
      response=>{
        console.log(response);
        location.reload();
      },
      error=>{
        console.log(error);
      }
    );

  }

  uncheckedUso(e,listaUsuarios:Usuario){

    this.ind_admin=0;

    this.usuarioService.nuevoPermisos(listaUsuarios.cod_usuario,this.cod_copPermiso, this.cod_espPermiso,listaUsuarios.cod_org,this.ind_admin)
    .subscribe(
      response=>{
        console.log(response);
        location.reload();
      },
      error=>{
        console.log(error);
      }
    );

    
  }
  
  permiso(){
    this.permisos=true;
    this.usuarios=false;
  }

  usuario(){
    this.usuarioService.getUsuarios(this.organizacion.cod_org).subscribe(
      res=>{
        this.listaUsuarios= res.usuarios;
      },
        err=>{
          console.log(err);
      }
    );
    this.permisos=false;
    this.usuarios=true;
  }
  
  abrirModalUsuario(usuario:Usuario,titulo:string,botonFin:string):Promise<any>{
    var data=[
      {
        input:"inputField",
        controlName:"nombre",
        placeHolder:"Nombre",
        data:usuario.nombre
      },
      {
        input:"inputField",
        controlName:"ape1",
        placeHolder:"Primer apellido",
        data:usuario.ape1
        
      },
      {
        input:"inputField",
        controlName:"ape2",
        placeHolder:"Segundo apellido",
        data:usuario.ape2
      },
      {
        input:"selectField",
        controlName:usuario.campo_clasificador1,
        placeHolder:usuario.campo_clasificador1,
        data:usuario.campo_clasificador1
      },
      {
        input:"selectField",
        controlName:usuario.campo_clasificador2,
        placeHolder:this.organizacion.categorias[2].tip_clasificacion,
        data:{
          data:this.organizacion.categorias,
          //TODO seleccionado
        }
        
      },
      {
        input:"selectField",
        controlName:usuario.campo_clasificador3,
        placeHolder:usuario.campo_clasificador3,
        data:usuario.campo_clasificador3
      },
    ];
    var config={
      data:data,
      titulo:titulo,
      botonFin:botonFin
    };
    return this.modalService.abrirModal(config);
  }

  editarUsuario(usuario:Usuario){

    this.abrirModalUsuario(usuario,"Modificar Usuario","Modificar").then(
      data=>{
        if(data!=null){
          this.modificarUsuarios(data.nombre,data.ape1,data.ape2,data.departamento,data.edad,data.horas,usuario.cod_usuario);
        }
      },
      error=>{
        //Nosa da igual que se cierre el modal
      }
      
    );

}
  modificarUsuarios(nombre,ape1,ape2,campo_clasificador1,campo_clasificador2,campo_clasificador3,cod_usuario){
      
    if(cod_usuario=="" || nombre=="" || ape1=="" || ape2=="" || campo_clasificador1=="" || campo_clasificador2==null || campo_clasificador3==""){
      
      window.alert("Rellena los campos");

    }else{
      this.usuarioService.modificarUsuario(nombre,ape1,ape2,campo_clasificador1,
        campo_clasificador2,campo_clasificador3,cod_usuario).subscribe(
          response=>{
            //TODO Alerts
            console.log(response);
            location.reload();
          },
          error=>{
            console.log(error);
          }
      );
    } 
  }

  addUsuario(){
    var cop:CopsItem=new CopsItem();
    var usuario:Usuario=new Usuario();
    usuario.tip_usuario=3;
    
    this.abrirModalUsuario(usuario,"Alta Usuario","Alta").then(
      data=>{
        if(data!=null){
          this.nuevoUsuario(data.cod_usuario,usuario.tip_usuario,
            this.organizacion.cod_org, data.sarbidea, data.nombre, data.ape1,
                data.ape2, data.departamento, data.edad, data.horas);
        }
      },
      error=>{
        //TODO Nos da igual que se cierre el modal
      }
    );  
  }


  nuevoUsuario(cod_usuario:string,tip_usuario:number,cod_org:number,sarbidea:string,nombre:string,ape1:string,ape2:string,campo_clasificador1:string,campo_clasificador2:string,campo_clasificador3:string){
    if(cod_usuario=="" || tip_usuario==null || cod_org==null || sarbidea=="" || nombre=="" || ape1=="" || ape2=="" || campo_clasificador1=="" || campo_clasificador2==null || campo_clasificador3==""){
      window.alert("Rellena los campos");
    }else{
      this.usuarioService.nuevoUsuario(cod_usuario,tip_usuario,cod_org,sarbidea,nombre,ape1,ape2,campo_clasificador1,campo_clasificador2,campo_clasificador3).subscribe(
      response=>{
        //TODO Alerts
        location.reload();
      },
      error=>{
        //TODO Alerts
        console.log(error);
      }
    );
    }
  }

  borrarUsuario(listaUsuarios:Usuario){
    if(window.confirm("¿Estas seguro de querer eliminar el usuario?")){
      this.usuarioService.eliminarUsuario(listaUsuarios.cod_usuario,this.organizacion.cod_org,).subscribe(
        response=>{
          location.reload();
          //TODO Alert
        },
        error=>{
          console.log(error);
          //TODO Alert
        }
      );
    }
  }




}

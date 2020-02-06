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
              private dialog:MatDialog) 
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
    console.log(this.organizacion);
    
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

    this.usuarioService.getUsuarios(this.organizacion.cod_org, 
                                    this.selectedEspacio.cod_esp, 
                                    this.selectedCop.cod_cop,
                                    this.selected, 
                                    this.selectedCategoria.categoria).subscribe(
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

      this.usuarioService.nuevoPermisos(listaUsuarios.cod_usuario,this.cod_copPermiso, this.cod_espPermiso,listaUsuarios.cod_org,this.ind_admin)
    .subscribe(
      response=>{
        
        location.reload();
      },
      error=>{
        
      }
    );
    }else{
      
      this.usuarioService.modificarPermisos(listaUsuarios.cod_usuario,listaUsuarios.cod_org,this.ind_admin)
          .subscribe(
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

uso(listaUsuarios:Usuario){

console.log(listaUsuarios.cod_usuario);


}



  
  permiso(){
    this.permisos=true;
    this.usuarios=false;
  }

  usuario(){
    this.usuarioService.getUsuario(this.organizacion.cod_org).subscribe(
      res=>{
        this.listaUsuarios= res.usuarios;
        console.log(res);
        console.log(this.listaUsuarios);
        
        
        
        
      },
        err=>{

      }
    );
    this.permisos=false;
    this.usuarios=true;

    
  }


  


  openModalUsuario(listaUsuarios:Usuario):Observable<any>{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.minWidth="50%";
    dialogConfig.data=[
      {
        input:"inputField",
        controlName:"nombre",
        placeHolder:"Nombre",
        data:{
          desc:listaUsuarios.nombre
        }
      },
      {
        input:"inputField",
        controlName:"ape1",
        placeHolder:"Primer apellido",
        data:{
          desc:listaUsuarios.ape1
        }
      },
      {
        input:"inputField",
        controlName:"ape2",
        placeHolder:"Segundo apellido",
        data:{
          desc:listaUsuarios.ape2
        }
      },
      {
        input:"inputField",
        controlName:"departamento",
        placeHolder:"Departamento",
        data:{
          desc:listaUsuarios.campo_clasificador1
        }
      },
      {
        input:"inputField",
        controlName:"edad",
        placeHolder:"Edad",
        data:{
          desc:listaUsuarios.campo_clasificador2
        }
      },
      {
        input:"inputField",
        controlName:"horas",
        placeHolder:"Horas",
        data:{
          desc:listaUsuarios.campo_clasificador3
        }
      },
    ];
    const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
    return dialogRef.afterClosed();
  }

  openModalUsuarioNuevo(listaUsuarios:Usuario):Observable<any>{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.minWidth="50%";
    dialogConfig.data=[
      
      {
        input:"inputField",
        controlName:"cod_usuario",
        placeHolder:"Email",
        data:{
          desc:listaUsuarios.cod_usuario
        }
      },
      {
        input:"inputField",
        controlName:"sarbidea",
        placeHolder:"Contraseña",
        data:{
          desc:listaUsuarios.sarbidea
        }
      },
      {
        input:"inputField",
        controlName:"nombre",
        placeHolder:"Nombre",
        data:{
          desc:listaUsuarios.nombre
        }
      },
      {
        input:"inputField",
        controlName:"ape1",
        placeHolder:"Primer apellido",
        data:{
          desc:listaUsuarios.ape1
        }
      },
      {
        input:"inputField",
        controlName:"ape2",
        placeHolder:"Segundo apellido",
        data:{
          desc:listaUsuarios.ape2
        }
      },
      {
        input:"inputField",
        controlName:"departamento",
        placeHolder:"Departamento",
        data:{
          desc:listaUsuarios.campo_clasificador1
        }
      },
      {
        input:"inputField",
        controlName:"edad",
        placeHolder:"Edad",
        data:{
          desc:listaUsuarios.campo_clasificador2
        }
      },
      {
        input:"inputField",
        controlName:"horas",
        placeHolder:"Horas",
        data:{
          desc:listaUsuarios.campo_clasificador3
        }
      },
    ];
    const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
    return dialogRef.afterClosed();
  }


  editarUsuario(listaUsuarios:Usuario){

    this.openModalUsuario(listaUsuarios).subscribe(
      data=>{
        if(data!=null){

            this.modificarUsuarios(data.nombre,data.ape1,data.ape2,data.departamento,data.edad,data.horas,listaUsuarios.cod_usuario);
          }else{
            this.modificarUsuarios(data.nombre,data.ape1,data.ape2,data.departamento,data.edad,data.horas,listaUsuarios.cod_usuario);
            
          }
        }
      
    );

}
modificarUsuarios(nombre,ape1,ape2,campo_clasificador1,campo_clasificador2,campo_clasificador3,cod_usuario){
      
  console.log(cod_usuario,nombre, ape1,ape2,campo_clasificador1,campo_clasificador2,campo_clasificador3)
  if(cod_usuario=="" || nombre=="" || ape1=="" || ape2=="" || campo_clasificador1=="" || campo_clasificador2==null || campo_clasificador3==""){
    window.alert("Rellena los campos");

  }else{
    this.usuarioService.modificarUsuario(nombre,ape1,ape2,campo_clasificador1,campo_clasificador2,campo_clasificador3,cod_usuario)
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
  
  
    }




    addUsuario(){
      var cop:CopsItem=new CopsItem();
      var nuevoUsu:Usuario=new Usuario();
      nuevoUsu.tip_usuario=3;
      
      this.openModalUsuarioNuevo(nuevoUsu).subscribe(
        data=>{
          if(data!=null){
                this.nuevoUsuario(data.cod_usuario,
                  nuevoUsu.tip_usuario,
                  this.organizacion.cod_org,
                  data.sarbidea,
                  data.nombre,
                  data.ape1,
                  data.ape2,
                  data.departamento,
                  data.edad,
                  data.horas            
                  );
         
            }else{
              this.nuevoUsuario(data.cod_usuario,
                nuevoUsu.tip_usuario,
                this.organizacion.cod_org,
                data.sarbidea,
                data.nombre,
                data.ape1,
                data.ape2,
                data.departamento,
                data.edad,
                data.horas           
                );
              }
            });
          }


          nuevoUsuario(cod_usuario:string,tip_usuario:number,cod_org:number,sarbidea:string,nombre:string,ape1:string,ape2:string,campo_clasificador1:string,campo_clasificador2:string,campo_clasificador3:string){

            
            if(cod_usuario=="" || tip_usuario==null || cod_org==null || sarbidea=="" || nombre=="" || ape1=="" || ape2=="" || campo_clasificador1=="" || campo_clasificador2==null || campo_clasificador3==""){
              window.alert("Rellena los campos");

            }else{
              
              this.usuarioService.nuevoUsuario(cod_usuario,tip_usuario,cod_org,sarbidea,nombre,ape1,ape2,campo_clasificador1,campo_clasificador2,campo_clasificador3).subscribe(
              response=>{
                location.reload();
                
                
              },
              error=>{
                console.log(error);
              }
            )
              
              
              
            }
            
          }



          borrarUsuario(listaUsuarios:Usuario){
            if(window.confirm("¿Estas seguro de querer eliminar el usuario?")){
              this.usuarioService.eliminarUsuario(listaUsuarios.cod_usuario,this.organizacion.cod_org,).subscribe(
                response=>{

                  location.reload();
                  
                },
                error=>{
                  console.log(error);
                }
              );
            }
          }




}

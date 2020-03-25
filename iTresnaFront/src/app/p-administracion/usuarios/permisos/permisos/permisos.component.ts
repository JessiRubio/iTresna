import { Component, OnInit } from '@angular/core';
import { CopsService } from 'src/app/servicios/cops.service';
import { EspaciosService } from 'src/app/servicios/espacios.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { OrganizacionesService } from 'src/app/servicios/organizaciones.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Organizacion, Clasificacion } from 'src/app/clases/organizacion';
import { Usuario, Permiso, ClasificacionUsuario } from 'src/app/clases/usuario';
import { EspaciosItem } from 'src/app/clases/espaciosItem';
import { CopsItem } from 'src/app/clases/copsitem';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {


  listaEspacios:EspaciosItem[] = []
  listaCops:CopsItem[] = [];
  listaUsuarios:Usuario[];
  listaUsuariosFiltrado:Usuario[];
  listaCategorias = [];
  listaClasificacion =[] = [];
  listaclasUsuarios:ClasificacionUsuario[];
  
  listaPermisos:Permiso[];
  cops:CopsItem[]=[];
  clasificacion:any;


  organizacion:Organizacion;
  categorias:Clasificacion;
  usuarioLogado:Usuario;
  show:boolean = false;
  showCops:boolean = false;
  showTabla:boolean = false;

  ind_admin:number;
  selected:string = "";
  selectedCategoria:any;
  selectedEspacio:EspaciosItem = null;
  selectedCop:CopsItem = null;
  cod_espPermiso:number;
  cod_copPermiso:number;
  estadoAdmin:boolean;
  estadoUso:boolean;

  permisos:boolean;
  usuarios:boolean;
  checked:boolean =false;
  esUsuario:boolean;
  marked = false;

  constructor(private copsService:CopsService,
    private espaciosService:EspaciosService,
    private usuarioService:UsuariosService,
    private organizacionService:OrganizacionesService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));

    this.organizacionService.getOrganizacionActual(this.usuarioLogado.cod_org).subscribe(
      response=>{
        this.organizacion=response.organizacion;
        this.categorias=response.organizacion.clasificacion;
        this.listaClasificacion[0] =this.organizacion.clasificacion[0].clasificacion;
        this.listaClasificacion[1] =this.organizacion.clasificacion[1].clasificacion;
        this.listaClasificacion[2] =this.organizacion.clasificacion[2].clasificacion;
        
        this.cargarEspacios(this.organizacion.cod_org);
        
      },
      error=>{

      }
    )
    

  }


  filtrarCategorias(event){
    //var clasificacion;
    this.clasificacion=event.target.value;
    
    this.listaCategorias = [];
  
    for(var i=0;i<this.organizacion.clasificacion.length;i++){
    
      if(this.clasificacion===this.categorias[i].clasificacion){
      
        this.selectedCategoria=this.categorias[i];
        for(var pos=0;pos<this.selectedCategoria.categorias.length;pos++){
          this.listaCategorias.push(this.selectedCategoria.categorias[pos]);
        }

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
  cargarCops(event){
   var desc_espacio;
    desc_espacio=event.target.value;
    var esp:EspaciosItem;
    var cod;
    
    for(var pos=0;pos<this.listaEspacios.length;pos++){

      if(this.listaEspacios[pos].desc_esp===desc_espacio){
        esp = this.listaEspacios[pos];
        cod= this.listaEspacios[pos].cod_esp;
        console.log(this.listaEspacios[pos]);

        break;
      }
    }

    this.cod_espPermiso=cod;
    this.descargarCops(esp);
   
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
        this.listaUsuariosFiltrado=res.usuarios;
        console.log(this.listaUsuarios);
        console.log(this.listaUsuarios[2].clasificacion[0].categoria);
        //this.listaclasUsuarios=res.usuarios.clasificacion;

      },
      err=>{

      }
    );
    
  }

  cargarTabla(event){
    var cop;
    var copS; 
    copS=event.target.value;
    for(var pos=0;pos<this.listaCops.length;pos++){

      if(this.listaCops[pos].desc_cop===copS){
        cop = this.listaCops[pos];
        this.selectedCop = cop;
        break;
      }
    }

    this.cod_copPermiso=cop.cod_cop;
    //console.log(this.cod_copPermiso);
    this.cargarUsuarios();
    this.showTabla = true;
    
    //console.log(this.listaUsuarios);
    //console.log(this.listaUsuarios.cod_usuario);
  }

  filtrar(event){
    var filtrado;
    filtrado=event.target.value;
    console.log(filtrado);
    //console.log(this.listaUsuarios);
    //console.log(this.listaClasificacion);
    var posicion;
    
    if(filtrado==="0"){
      this.listaUsuarios=this.listaUsuariosFiltrado;
    }
    else{
      for(var pos=0;pos<this.listaClasificacion.length;pos++){

      if(this.listaClasificacion[pos]===this.clasificacion){
        //console.log("la posicion es "+pos);
        posicion=pos;

      }
    }

    
    switch(posicion){
      case 0:
        
        //console.log("0");
        this.listaUsuarios=this.listaUsuariosFiltrado.filter(x=>x.clasificacion[0].categoria.indexOf(filtrado)!=-1);
        break;
      case 1:
        
        //console.log("1");
        this.listaUsuarios=this.listaUsuariosFiltrado.filter(x=>x.clasificacion[1].categoria.indexOf(filtrado)!=-1);
        break;
      case 2:
    
        //console.log("2");
        this.listaUsuarios=this.listaUsuariosFiltrado.filter(x=>x.clasificacion[2].categoria.indexOf(filtrado)!=-1);

    }
    }

    
    
  
  }


  pruebaUso(listaUsuarios:Usuario){
    if(listaUsuarios.permisos.length===0){
      
      this.estadoUso=false;
      return false;
    

    }else{

      for(var i=0;i<listaUsuarios.permisos.length;i++){
       
        if(listaUsuarios.permisos[i].cod_cop===this.cod_copPermiso){
          this.estadoUso=true;
          return true;
        }
        else{
          this.estadoUso=false;
          //return false;
          
          
        }
      }
      
     
      
      
    } 
  
  
  }

  pruebaAdmin(listaUsuarios:Usuario){

    if(listaUsuarios.permisos.length===0){

      this.estadoAdmin=false;

      return false;
    

    }else{
      
      for(var i=0;i<listaUsuarios.permisos.length;i++){
        
        if(listaUsuarios.permisos[i].ind_admin==true && listaUsuarios.permisos[i].cod_cop===this.cod_copPermiso ){
          this.estadoAdmin=true;  
          return true;
        }
        else{

          this.estadoAdmin=false;
          //return false;
              
        }

      }
    } 
    
  }
  uncheckedAdmin(e,listaUsuarios:Usuario){

    this.ind_admin=1;

    if(this.estadoUso===false && this.estadoAdmin===false){
      console.log("entro 0");

      this.usuarioService.nuevoPermisos(listaUsuarios.cod_usuario,this.cod_copPermiso, this.cod_espPermiso,listaUsuarios.cod_org,this.ind_admin)
    .subscribe(
      response=>{
        
        //location.reload();
      },
      error=>{
        
      }
    );
    }else{
      console.log("entro else");
      
      this.usuarioService.modificarPermisos(listaUsuarios.cod_usuario,this.cod_copPermiso,this.cod_espPermiso, listaUsuarios.cod_org,this.ind_admin)
          .subscribe(
            response=>{
              
              //location.reload();
            },
            error=>{
              
            }
          );
        }

  }

  checkedAdmin(e,listaUsuarios:Usuario){

    this.ind_admin=0;
    this.usuarioService.modificarPermisos(listaUsuarios.cod_usuario,this.cod_copPermiso, this.cod_espPermiso,listaUsuarios.cod_org,this.ind_admin)
    .subscribe(
      response=>{
        
        //location.reload();
      },
      error=>{
        
      }
    );
  }

  checkedUso(e,listaUsuarios:Usuario){

    this.usuarioService.borrarPermisos(listaUsuarios.cod_usuario,this.cod_copPermiso, this.cod_espPermiso,listaUsuarios.cod_org,this.ind_admin)
    .subscribe(
      response=>{
        console.log(response);
        //location.reload();
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
        //location.reload();
      },
      error=>{
        console.log(error);
      }
    );

    
  }


}

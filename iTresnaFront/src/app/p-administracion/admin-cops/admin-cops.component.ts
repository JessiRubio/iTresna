import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../clases/usuario';
import { EspaciosItem } from './../../clases/espaciosItem';
import { EspaciosService } from '../../servicios/espacios.service';
import {CopsService} from './../../servicios/cops.service';
import { CopsItem } from '../../clases/copsitem';
import { EtiquetaItem } from '../../clases/copsitem';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {ModalServiceService} from '../../servicios/modal-service.service';
@Component({
  selector: 'app-admin-cops',
  templateUrl: './admin-cops.component.html',
  styleUrls: ['./admin-cops.component.css']
})
export class AdminCopsComponent implements OnInit {
  usuarioLogeado:Usuario;
  espacios:EspaciosItem[]=[];
  cops:CopsItem[]=[];
  etiquetas:EtiquetaItem[];
  selected=0;
  copSelected=0;
  public showEtiquetas:boolean = false;
  public showCops:boolean=true;
  copsRows:string[]=["nombre","editar","borrar"]
  constructor(
    private espaciosService:EspaciosService,
    private copsService:CopsService,
    private dialog:MatDialog,
    private modalService:ModalServiceService
  ) { }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.espaciosService.getEspacios(this.usuarioLogeado.cod_org).subscribe(
      response=>{
        if(response.error==0){
          this.espacios=response.espacios;
          this.cargarCops();
        }
      },
      error=>{

      }
    );
  }
  
  cargarCops(){
    this.showEtiquetas=false; 
    var cod_org=this.espacios[this.selected].cod_org;
    var cod_esp=this.espacios[this.selected].cod_esp;
    this.copsService.getCops(cod_org,cod_esp,this.usuarioLogeado.cod_usuario).subscribe(
      response=>{
        if(response.error==0){
          this.cops=response.cops
        }
      },
      error=>{

      }
    );
  }
  editar(cod_org,cod_esp,cod_cop){
    this.copsService.getCop(cod_org,cod_esp,cod_cop).subscribe(
      respose=>{
        //TODO Alerts
        if(respose.error==0)
          this.editarCop(respose.cop);
      },
      error=>{
        window.alert("Error de conexion con el servidor");
      }
    );
  }

  abrirModal(cop:CopsItem,titulo:string,botonFin:string):Promise<any>{
    var data=[
      {
        input:"inputField",
        controlName:"nombre",
        placeHolder:"Escribe el nombre de la cop",
        data:cop.desc_cop
      },
      {
        input:"fileField",
        controlName:"imagen",
        placeHolder:"Selecciona un archivo",
        data:""
      },
    ];
    var config={
      data:data,
      botonFin:botonFin,
      titulo:titulo
    };
    return this.modalService.abrirModal(config);
  }
  
  editarCop(cop:CopsItem){
    this.abrirModal(cop,"Modificar Cop","Guardar").then(
      data=>{
        if(data!=null){
          if(data.imagen!=null){
            this.modificar(cop.cod_org,cop.cod_esp,cop.cod_cop,data.nombre,data.imagen);
            
          }else{
            this.modificar(cop.cod_org,cop.cod_esp,cop.cod_cop,data.nombre,"");
          }
        }
      },
      error=>{
        //Nos da igual que no se cierre correctamente
      }
    );
  
  }
  
  addCop(){
    var cop:CopsItem=new CopsItem();
    cop.cod_org=this.espacios[this.selected].cod_org;
    cop.cod_esp=this.espacios[this.selected].cod_esp;
    this.abrirModal(cop,"Alta Cop","Alta").then(
      data=>{
        if(data!=null){
          if(data.imagen!=null){
            this.nuevaCop(cop.cod_org,cop.cod_esp,data.nombre,data.imagen);
          }else{
            this.nuevaCop(cop.cod_org,cop.cod_esp,data.nombre,"");
          }
        }
      },
      error=>{
        //Nos da igual que se cierre el modal
      }
    );
  }

  nuevaCop(cod_org:number,cod_esp:number,desc:string,imagen:string){
    this.copsService.nuevaCop(cod_org,cod_esp,desc,imagen).subscribe(
      response=>{
        //TODO Alerts
        if(response.error==0){
          location.reload();
        }else{
          window.alert("No se ha podido eliminar la cop, espero a otro momento" 
          +"o contacte con el administrador");
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  modificar(cod_org,cod_esp,cod_cop,desc_cop,file_encoded){
    this.copsService.modificarCop(cod_org,cod_esp,cod_cop,desc_cop,file_encoded)
    .subscribe(
      response=>{
        //TODO Alerts
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    );
  }
  borrar(cop:CopsItem){
    if(window.confirm("¿Estas seguro de querer eliminar la cop?")){
      this.copsService.eliminarCop(cop.cod_org,cop.cod_esp,cop.cod_cop).subscribe(
        response=>{
          //TODO Alerts
          if(response.error==0){
            location.reload();
          }else{
            window.alert("No se ha podido eliminar la cop")
          }
        },
        error=>{
          console.log(error);
        }
      );
    }
  }

  gestionarEtiquetas(index:number){

    var cop=this.cops[index];
    this.copSelected=index;
    this.showEtiquetas =true;
    this.showCops =false;
    this.copsService.getCop(cop.cod_org, cop.cod_esp,cop.cod_cop)
    .subscribe(
      response=>{
        if(response.error==0){
          this.etiquetas=response.cop.etiquetas;
        }else{
          window.alert("No se han podido cargar las etiquetas")
        }
      }
    )
  }

  private abrirModalEtiquetas(etiqueta:EtiquetaItem,titulo:string,botonFin:string):Promise<any>{
  
    var data=[
      {
        input:"inputField",
        controlName:"etiqueta",
        placeHolder:"Escribe el nombre de la etiqueta",
        data:etiqueta.desc_etiqueta
      }
    ];
    var conf={
      data:data,
      titulo:titulo,
      botonFin:botonFin
    }
    return this.modalService.abrirModal(conf);
  }

  editarEtiqueta(etiqueta:EtiquetaItem){
    this.abrirModalEtiquetas(etiqueta,"Modificar Etiqueta","Modificar").then(
      data=>{
        console.log(data);
        if(data!=null){
          this.modificarEtiquetas(data.etiqueta,etiqueta.cod_etiqueta);
        }
      },
      error=>{
        //Nos da igual que el modal se cierre
      }
    );

}

  modificarEtiquetas(desc_etiqueta, cod_etiqueta){
  this.copsService.modificarEtiqueta(desc_etiqueta, cod_etiqueta)
  .subscribe(
    response=>{
      //TODO Alerts
      if(response.error==0){

      }
      location.reload();
    },
    error=>{
      //TODO Alerts
      console.log(error);
    }
  );
  }


  borrarEtiqueta(etiquetas:EtiquetaItem){
    if(window.confirm("¿Estas seguro de querer eliminar la Etiqueta?")){
      this.copsService.eliminarEtiqueta(etiquetas.cod_etiqueta,etiquetas.desc_etiqueta).subscribe(
        response=>{
          location.reload();
          //TODO Alerts
        },
        error=>{
          //TODO Alerts
          console.log(error);
        }
      );
    }
  }

  addEtiqueta(){
    var cop:CopsItem=new CopsItem();
    
    var etiqueta:EtiquetaItem=new EtiquetaItem();
    etiqueta.desc_etiqueta="";
    cop.cod_org=this.cops[this.copSelected].cod_org;
    cop.cod_esp=this.cops[this.copSelected].cod_esp;
    cop.cod_cop=this.cops[this.copSelected].cod_cop;
    
    this.abrirModalEtiquetas(etiqueta,"Alta Etiqueta","Alta").then(
      data=>{
        if(data!=null){
          this.nuevaEtiqueta(cop.cod_cop,cop.cod_esp,cop.cod_org,data.etiqueta);
        }else{
          this.nuevaEtiqueta(cop.cod_cop,cop.cod_esp,cop.cod_org,data.etiqueta);
        }
      },
      error=>{
        //Nos da igual que se cierre el modal
      }
    );
  }


  nuevaEtiqueta(cod_cop:number,cod_esp:number,cod_org:number,desc_etiqueta:string){
    this.copsService.nuevaEtiqueta(cod_cop,cod_esp,cod_org,desc_etiqueta).subscribe(
      response=>{
        //TODO Alerts
        
        //location.reload();
      },
      error=>{
        //TODO Alerts
        console.log(error);
      }
    );
  }

  atrasEtiquetas(){
    this.showEtiquetas =false;
    this.showCops =true;
  }
}

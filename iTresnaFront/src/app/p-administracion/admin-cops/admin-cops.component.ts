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
import { Alerta } from '../../clases/alerta';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertGenericoComponent } from '../../alert-generico/alert-generico.component';
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
    private modalServiceAlert:NgbModal,  
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
        if(respose.error==0){
          this.editarCop(respose.cop);
          let alert:Alerta = {
            message:"Cop modificada, redirigiendo", 
            type:'success'
          };
          this.abrirAlerta(alert);
        }
        else{
          let alert:Alerta = {
            message:"No se ha podido modificar la cop correctamente, intentelo más tarde", 
            type:'danger'
          };
          this.abrirAlerta(alert);
        }
      },
      error=>{
        let alert:Alerta = {
          message:"Error de conexión con el servidor, intentelo más tarde", 
          type:'danger'
        };
        this.abrirAlerta(alert);
      }
    );
  }

  abrirAlerta(alerta:Alerta){
    let modalRef:NgbModalRef;
    modalRef=this.modalServiceAlert.open(AlertGenericoComponent, {centered:true});
    (<AlertGenericoComponent>modalRef.componentInstance).alert=alerta;
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

        if(response.error==0){
          
          let alert:Alerta = {
            message:"Cop añadida, redirigiendo", 
            type:'success'
          };
          this.abrirAlerta(alert);
          location.reload();
        }else{
          let alert:Alerta = {
            message:"No se ha podido añadir la cop correctamente, intentelo más tarde", 
            type:'danger'
          };
          this.abrirAlerta(alert);
        }
      },
      error=>{
        let alert:Alerta = {
          message:"Error de conexión con el servidor, intentelo más tarde", 
          type:'danger'
        };
        this.abrirAlerta(alert);
      }
      
    )
  }

  modificar(cod_org,cod_esp,cod_cop,desc_cop,file_encoded){
    this.copsService.modificarCop(cod_org,cod_esp,cod_cop,desc_cop,file_encoded)
    .subscribe(
      response=>{
        console.log(response);
        if(response.error == 0){
          let alert:Alerta = {
            message:"Cop modificada correctamente, redirigiendo", 
            type:'success'
          };
          this.abrirAlerta(alert);
          location.reload();
        }
        else{
          let alert:Alerta = {
            message:"No se ha podido modificar la cop correctamente, intentelo más tarde", 
            type:'danger'
          };
          this.abrirAlerta(alert);
        }
      },
      error=>{
        let alert:Alerta = {
          message:"Error de conexión con el servidor, intentelo más tarde", 
          type:'danger'
        };
        this.abrirAlerta(alert);
      }
    );
  }

  borrar(cop:CopsItem){
    if(window.confirm("¿Estas seguro de querer eliminar la cop?")){
      this.copsService.eliminarCop(cop.cod_org,cop.cod_esp,cop.cod_cop).subscribe(
        response=>{
          if(response.error==0){
            let alert:Alerta = {
              message:"Cop eliminada correctamente, redirigiendo", 
              type:'success'
            };
            this.abrirAlerta(alert);
            location.reload();
          }else{
            window.alert("No se ha podido eliminar la cop, intentelo más tarde")
          }
        },
        error=>{
          let alert:Alerta = {
          message:"Error de conexión con el servidor, intentelo más tarde", 
          type:'danger'
        };
        this.abrirAlerta(alert);
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
          let alert:Alerta = {
            message:"No se han podido cargar las etiquetas", 
            type:'danger'
          };
          this.abrirAlerta(alert);
        }
      },
      error=>{
        let alert:Alerta = {
          message:"Error de conexión con el servidor, intentelo más tarde", 
          type:'danger'
        };
        this.abrirAlerta(alert);
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
        let alert:Alerta = {
          message:"Error de conexión con el servidor, intentelo más tarde", 
          type:'danger'
        };
        this.abrirAlerta(alert);
      }
    );
  }

  modificarEtiquetas(desc_etiqueta, cod_etiqueta){
  this.copsService.modificarEtiqueta(desc_etiqueta, cod_etiqueta)
  .subscribe(
    response=>{
      if(response.error==0){
        let alert:Alerta = {
          message:"Etiqueta modificada correctamente, redirigiendo", 
          type:'success'
        };
        this.abrirAlerta(alert);
        location.reload();
      }
      else{
        let alert:Alerta = {
          message:"No se ha podido modificar la etiqueta correctamente, intentelo más tarde", 
          type:'danger'
        };
        this.abrirAlerta(alert);
      }
    },
    error=>{
      let alert:Alerta = {
        message:"Error de conexión con el servidor, intentelo más tarde", 
        type:'danger'
      };
      this.abrirAlerta(alert);
    }
  );
  }


  borrarEtiqueta(etiquetas:EtiquetaItem){
    if(window.confirm("¿Estas seguro de querer eliminar la Etiqueta?")){
      this.copsService.eliminarEtiqueta(etiquetas.cod_etiqueta,etiquetas.desc_etiqueta).subscribe(
        response=>{
          if(response.error == 0){
            let alert:Alerta = {
              message:"Etiqueta borrada correctamente, redirigiendo", 
              type:'success'
            };
            this.abrirAlerta(alert);
            location.reload();
          }
          let alert:Alerta = {
            message:"No se ha podido borrar la etiqueta correctamente, intentelo más tarde", 
            type:'danger'
          };
          this.abrirAlerta(alert);
        },
        error=>{
          let alert:Alerta = {
            message:"Error de conexión con el servidor, intentelo más tarde", 
            type:'danger'
          };
          this.abrirAlerta(alert);
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
        }
      },
      error=>{
        let alert:Alerta = {
          message:"Error de conexión con el servidor, intentelo más tarde", 
          type:'danger'
        };
        this.abrirAlerta(alert);
      }
    );
  }


  nuevaEtiqueta(cod_cop:number,cod_esp:number,cod_org:number,desc_etiqueta:string){
    this.copsService.nuevaEtiqueta(cod_cop,cod_esp,cod_org,desc_etiqueta).subscribe(
      response=>{
        if(response.error == 0){
          let alert:Alerta = {
            message:"Etiqueta añadida correctamente, redirigiendo", 
            type:'success'
          };
          this.abrirAlerta(alert);
          location.reload();
        } 
        else{
          let alert:Alerta = {
            message:"No se ha podido añadir la etiqueta correctamente, intentelo más tarde", 
            type:'danger'
          };
          this.abrirAlerta(alert);
        }
      },
      error=>{
        let alert:Alerta = {
          message:"Error de conexión con el servidor, intentelo más tarde", 
          type:'danger'
        };
        this.abrirAlerta(alert);
      }
    );
  }

  atrasEtiquetas(){
    this.showEtiquetas =false;
    this.showCops =true;
  }

  
}

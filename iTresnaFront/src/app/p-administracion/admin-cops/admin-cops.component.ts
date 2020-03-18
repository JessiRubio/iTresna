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
        let alert:Alerta = {
          message:"Error con el servidor, no se han podido cargar los datos.", 
          type:'danger'
        };
        this.abrirAlerta(alert);
      }
    );
  }
  
  editar(cod_org,cod_esp,cod_cop){
    this.copsService.getCop(cod_org,cod_esp,cod_cop).subscribe(
      respose=>{
        if(respose.error==0){
          this.editarCop(respose.cop);
        }
        else{
          let alert:Alerta = {
            message:"No se ha podido cargar la cop.", 
            type:'warning'
          };
          this.abrirAlerta(alert);
        }
      },
      error=>{
        let alert:Alerta = {
          message:"Error con el servidor.", 
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
        var alert:Alerta;
        if(response.error==0){
          
          alert = {
            message:"La cop se ha añadido", 
            type:'success'
          };
          this.cargarCops();
        }else{
          alert = {
            message:"No se ha podido añadir la cop.", 
            type:'warning'
          };
          
        }
        this.abrirAlerta(alert);
      },
      error=>{
        let alert:Alerta = {
          message:"Error con el servidor", 
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
        var alert:Alerta;
        if(response.error == 0){
          alert = {
            message:"Cop modificada correctamente.", 
            type:'success'
          };
          this.cargarCops();
        }
        else{
          alert = {
            message:"No se ha podido modificar la cop correctamente.", 
            type:'warning'
          };
        }
        this.abrirAlerta(alert);
      },
      error=>{
        var alert:Alerta = {
          message:"Error con el servidor", 
          type:'danger'
        };
        this.abrirAlerta(alert);
      }
    );
  }

  borrar(cop:CopsItem){
    var config:{titulo:string,label:string,botonFin:string,botonCancel:string};
    config={
      botonCancel:"Cancelar",
      botonFin:"Aceptar",
      titulo:"Borrar",
      label:"¿Estas seguro de eliminar el espacio seleccionado?"
    }
    this.modalService.abrirModalTexto(config).then(
      data=>{
        this.copsService.eliminarCop(cop.cod_org,cop.cod_esp,cop.cod_cop).subscribe(
          response=>{
            var alert:Alerta;
            if(response.error==0){
              alert = {
                message:"Cop eliminada correctamente", 
                type:'success'
              };
              this.cargarCops();
            }else{
              alert = {
                message:"No se ha podido eliminar la cop", 
                type:'warning'
              };
            }
            this.abrirAlerta(alert);
          },
          error=>{
            let alert:Alerta = {
              message:"Error con el servidor", 
              type:'danger'
            };
            this.abrirAlerta(alert);
          }
        );
      },
      error=>{
        //Se ha cerrado el modal mediante cancelar u otro boton
      }
    );
  }

  gestionarEtiquetas(index:number){
    this.copSelected=index;
    this.showEtiquetas =true;
    this.showCops =false;
    this.cargarEtiquetas();
  }
  private cargarEtiquetas(){
    var cop=this.cops[this.copSelected];
    this.copsService.getCop(cop.cod_org, cop.cod_esp,cop.cod_cop)
    .subscribe(
      response=>{
        if(response.error==0){
          this.etiquetas=response.cop.etiquetas;
        }else{
          let alert:Alerta = {
            message:"No se han podido cargar las etiquetas", 
            type:'warning'
          };
          this.abrirAlerta(alert);
        }
      },
      error=>{
        let alert:Alerta = {
          message:"Error con el servidor", 
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
        if(data!=null){
          this.modificarEtiquetas(data.etiqueta,etiqueta.cod_etiqueta);
        }
      },
      error=>{
        //Nos da igual que se cierre el modal
      }
    );
  }

  modificarEtiquetas(desc_etiqueta, cod_etiqueta){
  this.copsService.modificarEtiqueta(desc_etiqueta, cod_etiqueta)
  .subscribe(
    response=>{
      var alert:Alerta;
      if(response.error==0){
        alert = {
          message:"Etiqueta modificada correctamente", 
          type:'success'
        };
      this.cargarEtiquetas();
      }
      else{
        alert = {
          message:"No se ha podido modificar la etiqueta correctamente.", 
          type:'warning'
        };
      }
      this.abrirAlerta(alert);

    },
    error=>{
      let alert:Alerta = {
        message:"Error con el servidor.", 
        type:'danger'
      };
      this.abrirAlerta(alert);
    }
  );
  }


  borrarEtiqueta(etiqueta:EtiquetaItem){
    var config:{titulo:string,label:string,botonFin:string,botonCancel:string};
    config={
      botonCancel:"Cancelar",
      botonFin:"Aceptar",
      titulo:"Borrar",
      label:"¿Estas seguro de eliminar el espacio seleccionado?"
    }
    this.modalService.abrirModalTexto(config).then(
      data=>{
        var cop=this.cops[this.copSelected];
        this.copsService.eliminarEtiqueta(cop.cod_org,cop.cod_esp,
          cop.cod_cop,etiqueta.cod_etiqueta).subscribe(
            response=>{
              var alert:Alerta;
              if(response.error == 0){
                alert = {
                  message:"Etiqueta borrada correctamente.", 
                  type:'success'
                };
                this.cargarEtiquetas();
              }else{
                alert = {
                  message:"No se ha podido borrar la etiqueta correctamente.", 
                  type:'warning'
                };
              }
              this.abrirAlerta(alert);
            },
            error=>{
              let alert:Alerta = {
                message:"Error con el servidor.", 
                type:'danger'
              };
              this.abrirAlerta(alert);
            }
        );
      },
      error=>{
        //Se ha cancelado el usuario
      }
    );
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
        //Nos da igual que se cierre el modal
      }
    );
  }


  nuevaEtiqueta(cod_cop:number,cod_esp:number,cod_org:number,desc_etiqueta:string){
    this.copsService.nuevaEtiqueta(cod_cop,cod_esp,cod_org,desc_etiqueta).subscribe(
      response=>{
        var alert:Alerta;
        if(response.error == 0){
          alert = {
            message:"Etiqueta añadida correctamente.", 
            type:'success'
          };
          this.cargarEtiquetas();
        } 
        else{
          alert = {
            message:"No se ha podido añadir la etiqueta.", 
            type:'warning'
          };
        }
        this.abrirAlerta(alert);
      },
      error=>{
        let alert:Alerta = {
          message:"Error con el servidor.", 
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

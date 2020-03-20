import { Component, OnInit, Input } from '@angular/core';
import { Organizacion } from '../clases/Organizacion';
import { Router } from '@angular/router';
import { OrganizacionesService} from '../servicios/organizaciones.service';
import { Usuario } from '../clases/usuario';
import { ModalServiceService } from '../servicios/modal-service.service';
import {AlertService} from '../servicios/alert.service';
import { Alerta } from '../clases/alerta';

@Component({
  selector: 'app-p-ad-organizaciones',
  templateUrl: './p-ad-organizaciones.component.html',
  styleUrls: ['./p-ad-organizaciones.component.css']
})
export class PAdOrganizacionesComponent implements OnInit {

  show:boolean=false;

  usuarioLogado:Usuario;
  listaOrgMostradas:Organizacion[]=[];
  listaOrganizacion:Organizacion[]=[];
  currentItem;
  seleccionFiltro:number=1;
  seleccionOrden:number=1;
  organizacion:Organizacion;
  constructor(
    private organizacionesService:OrganizacionesService,
    private router: Router,
    private modalService:ModalServiceService,
    private alertaService:AlertService) 
    {

   }

  ngOnInit() {
    if(localStorage.getItem("usuario")!=null){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      if(this.usuarioLogado.tip_usuario==1){
        this.router.navigateByUrl("Organizaciones");
      }else{
        this.router.navigateByUrl("Principal");
      }
    }
    
    if(localStorage.length>0){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      this.cargarOrganizaciones();
 
    }else{
      this.router.navigateByUrl("");
    }
  }

  cargarOrganizaciones(){
    this.organizacionesService.getOrganizaciones()
        .subscribe(
          res =>{
            if(res.error == 0){
              this.listaOrganizacion=res.organizaciones;
              this.listaOrgMostradas=this.listaOrganizacion;
            }
            else{
              
            }
          }, 
          err =>{ 
            console.log(err);

          } 
      );
  }

  async administrar(item){
    if (this.currentItem === item) return;
    this.currentItem = item;
    this.usuarioLogado.cod_org=this.currentItem.cod_org;
    let string=await JSON.stringify(this.usuarioLogado);
    await localStorage.setItem("usuario",string);
    this.router.navigateByUrl("Administracion");
  }
  filtrarOrganizaciones(){
    this.show=this.seleccionFiltro!=1;
  }
  ordenarOrganizaciones(){
    switch(this.seleccionOrden){
      case 1:
        this.listaOrgMostradas=this.listaOrgMostradas.sort((a,b)=>{
          return a.desc_org.localeCompare(b.desc_org);
        });
        break;
      case 2:
          this.listaOrgMostradas=this.listaOrgMostradas.sort((a,b)=>{
            return a.desc_org.localeCompare(b.desc_org)*-1;
          });
        break;
        default:
          break;
    }
  }
  applyFilter(filter:string){
    switch(this.seleccionFiltro){
      case 2:
        
        this.listaOrgMostradas=this.listaOrganizacion.filter(x=>{
          if(filter!==""){
            if(x.contacto==null){
              return false;
            }else{
              return x.contacto.indexOf(filter)!=-1;
            }
          }
          return true;
        });
        break;
      case 3:
    
        this.listaOrgMostradas=this.listaOrganizacion.filter(x=>{
          if(filter!==""){
            if(x.desc_org==null){
              return false;
            }else{
              return x.desc_org.indexOf(filter)!=-1
            }
          }
          return true;
        });

    }
    this.ordenarOrganizaciones();
  }
  borrar(item:Organizacion){
    var config:{titulo:string,label:string,botonFin:string,botonCancel:string};
    config={
      botonCancel:"Cancelar",
      botonFin:"Aceptar",
      titulo:"Borrar",
      label:"¿Esta seguro de querer eliminar la organizacion?"
    }
    this.modalService.abrirModalTexto(config).then(
      data=>{
        config.label="Esta acción no tiene vuelta atras,¿Seguro que desea eliminarlo?";
        this.modalService.abrirModalTexto(config).then(
          data=>{
            this.borrarOrganizacion(item);
          },
          error=>{
            //Se cierra mediante el boton cancelar
          }
        );
      },
      error=>{
        //Se cierra mendiante el boton cancelar
      }
    );
  }
  private borrarOrganizacion(organizacion:Organizacion){
    this.organizacionesService.eliminarOrganizacion(organizacion.cod_org).subscribe(
      response=>{
        var alert:Alerta;
        if(response.error==0){
          alert = {
            message:"Organización borrada correctamente", 
            type:'success'
          };
          this.cargarOrganizaciones();
        }else{
          alert = {
            message:"No se pudo eliminar la Organización", 
            type:'warning'
          };
        }
        this.alertaService.abrirAlerta(alert);
      },
      error=>{
        let alert:Alerta = {
          message:"Error con el servidor",
          type:'danger'
        };
        this.alertaService.abrirAlerta(alert);
      }
    );
  }
  nueva(){
    var organizacion=new Organizacion();
    organizacion.usuarios=[];
    this.abrirModal(organizacion,"Alta Organizacion","Alta",organizacion.contacto).then(
      data=>{
        if(data!=null){
          var file="";
          if(data.imagen!=""||data.imagen==null){
            var reader = new FileReader();
            reader.readAsDataURL(data.imagen);
            reader.onload = () =>{
              this.nuevaOrgnizacion(data.nombre,
                data.descripcion,
                data.enlace,
                reader.result.toString().split(',')[1]);              
            };
            
          }else{
            this.nuevaOrgnizacion(data.nombre,data.descripcion,data.enlace,"");
          }
        }
      },
      error=>{
        //Nos da igal que se cierre el modal 
      }
    );
  }
  private nuevaOrgnizacion(nombre:string,descripcion:string,enlace:string,imagen:string){
    this.organizacionesService.nuevaOrgnizacion(nombre,descripcion,enlace,imagen).subscribe(
      response=>{
        var alert:Alerta
        if(response.error==0){
          alert = {
            message:"Organización creada correctamente", 
            type:'success'
          };
          this.cargarOrganizaciones();
        }else{
          alert = {
            message:"Fallo al crear la Organización", 
            type:'warning'
          };
        }
        this.alertaService.abrirAlerta(alert);
      },
      error=>{
        let alert:Alerta = {
          message:"Error con el servidor",
          type:'danger'
        };
        this.alertaService.abrirAlerta(alert);
      }
    );
  }

  editar(item:Organizacion){
    this.organizacionesService.getOrganizacionActual(item.cod_org).subscribe(
      response=>{
        item.usuarios=response.organizacion.usuarios
        this.abrirModal(item,"Modificar Organización","Modificar",item.contacto).then(
          data=>{
            if(data!=null){
              var contacto=data.contacto;
              if(data.imagen!=""||data.imagen==null){
                var file:File=data.imagen;
                this.modificar(item.cod_org,
                  data.nombre,
                  data.descripcion,
                  contacto,
                  data.enlace,
                  data.imagen);         
              }else{
                this.modificar(item.cod_org,data.nombre,data.descripcion,contacto,data.enlace,"");
              }
            }
          },
          error=>{
            //Nos da igual que se cierre sin datos (por dismiss)
          }
        );
      },
      error=>{
        let alert:Alerta = {
          message:"Error con el servidor, no se han podido cargar los datos.",
          type:'danger'
        };
        this.alertaService.abrirAlerta(alert);
      }
    );
  }
  private modificar(cod_org:number,desc_org:string,eslogan:string,contacto:string,enlace:string,imagen:string){
    this.organizacionesService.modificarOrganizacion(cod_org,desc_org,eslogan,contacto,enlace,imagen).subscribe(
      response=>{
        var alert:Alerta;
        if(response.error==0){
          alert = {
            message:"Organización modificada correctamente", 
            type:'success'
          };
          this.cargarOrganizaciones();
        }else{
          alert = {
            message:"Fallo al modificar la Organización", 
            type:'warning'
          };
        }
        this.alertaService.abrirAlerta(alert);
      },
      error=>{
        let alert:Alerta = {
          message:"Error con el servidor",
          type:'danger'
        };
        this.alertaService.abrirAlerta(alert);
      }
    );
  }

  private abrirModal(item:Organizacion,titulo:string,textoBotonFin:string,selected:any):Promise<any>{
    var data=[
      {
        input:"inputField",
        controlName:"nombre",
        placeHolder:"Escribe el nombre de la org",
        data:item.desc_org
      },
      {
        input:"inputField",
        controlName:"descripcion",
        placeHolder:"Escribe la descripcion de la org",
        data:item.eslogan_org
      },
      {
        input:"fileField",
        controlName:"imagen",
        placeHolder:"Selecciona un archivo",
        data:""
      },
      {
        input:"inputField",
        controlName:"enlace",
        placeHolder:"Escribe en enlace a la org",
        data: item.enlace_org
      },
      {
        input:"selectField",
        controlName:"contacto",
        placeHolder:"Selecciona un contacto",
        data:{
          data:item.usuarios,
          seleccionado:selected
        }
      }
    ];
    var config={
      titulo:titulo,
      data:data,
      botonFin:textoBotonFin
    };
    return this.modalService.abrirModal(config);
  }

  filtroSeleccionado():string{
    if (this.seleccionFiltro==1){
      return "Ninguno";
    }else if (this.seleccionFiltro==2){
      return "Contacto";
    }
    else if(this.seleccionFiltro==3){
      return "Organizacion";
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { CopsItem } from '../clases/copsitem';
import { EspaciosItem } from '../clases/espaciosItem';
import { SenalesItem } from './../clases/senales-item';
import { ActivatedRoute, Router, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { EspaciosService } from './../servicios/espacios.service';
import { SenalesService} from './../servicios/senales.service';
import { CopsService } from './../servicios/cops.service';
import { Usuario } from  './../clases/usuario';
import { Observable } from 'rxjs';
import { EtiquetaItem } from './../clases/copsitem';
import { ModalSenalComponent } from './modalsenal/modalsenal.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Alerta } from '../clases/alerta'
import { NgbModal, NgbModalOptions, NgbModalRef, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertGenericoComponent } from '../alert-generico/alert-generico.component';
import { MatLinkPreviewComponent, MatLinkPreviewService } from '@angular-material-extensions/link-preview';
import { HttpClient } from '@angular/common/http';
import { ModalServiceService } from '../servicios/modal-service.service';


@Component({
  selector: 'app-p-cops',
  templateUrl: './p-cops.component.html',
  styleUrls: ['./p-cops.component.css']
})

export class PCopsComponent implements OnInit {
  usuarioLogeado:Usuario;
  cod_esp:number;
  cod_cop:number;
  listaSenales:SenalesItem[]=[];
  listSenalesMostradas:SenalesItem[]=[];
  cop:CopsItem=new CopsItem();
  espacio:EspaciosItem = new EspaciosItem();
  selected: string = '';
  filtroEtiqueta:number=-1;
  filtroUsuario:number=-1;
  permisosShow:boolean=false;
  
  listaCops:CopsItem[]=[];
  curando=false;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private espaciosService:EspaciosService,
    private copsService:CopsService,
    private senalesService:SenalesService,
    private dialog:MatDialog,
    private ngbModalService:NgbModal,
    private http:HttpClient,
    private modalService:ModalServiceService
    ) {}

  ngOnInit() {
    if(localStorage.getItem("usuario")==null){
      this.router.navigateByUrl("");
    }
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.route.queryParams.subscribe(params => {
      this.cod_cop = params['copSeleccionado'];
      this.cod_esp = params['codEspacio'];
      this.cargarEsp();
      this.cargarCop();
      this.cargarSenales();
      this.cargarCopsDeEsp();
      
    });
    
  }
  cargarCopsDeEsp(){
    this.copsService.getCops(this.usuarioLogeado.cod_org,this.cod_esp,this.usuarioLogeado.cod_usuario)
      .subscribe(
        response=>{
          if(response.error==0){
            this.listaCops=response.cops;
          }
        }
      );
  }

  cargarEsp(){
    this.espaciosService.getEspacio(this.usuarioLogeado.cod_org,this.cod_esp)
        .subscribe(
          res=>{
            if(res.error==0){
              this.espacio=res.espacio;
            }
          },
          err=>{
            
          }
        );
  }

  cargarCop(){
    this.copsService.getCop(this.usuarioLogeado.cod_org,this.cod_esp,this.cod_cop)
      .subscribe(
        res=>{  
          if(res.error==0){
            this.cop=res.cop;
            this.tienePermisos();
          }
        },
        err=>{
        }
      );
  }
  
  cargarSenales(){
    this.senalesService.getSenales(this.usuarioLogeado.cod_org,this.cod_esp,this.cod_cop,this.usuarioLogeado.cod_usuario).subscribe(
      res=>{
        if(res.error==0){
          this.listaSenales=res.senales;
          this.listSenalesMostradas=res.senales;
        }
      },
      err=>{
        console.log(err);

      }
    );   
  }

  tienePermisos(){
    if(this.usuarioLogeado.tip_usuario==2){
      this.permisosShow=true;
    }else{
      if(this.usuarioLogeado.permisos.length>0){
        for(var i=0;i<this.usuarioLogeado.permisos.length;i++){
          if(this.usuarioLogeado.permisos[i].cod_cop===this.cop.cod_cop 
            && this.usuarioLogeado.permisos[i].ind_admin===true){
            this.permisosShow=true;
            break;
          }
        }
      }
    }
    
  }

  ordenar(valorSelect:String){
    switch(valorSelect){
      case "0":
        this.listaSenales.sort((a,b)=>{
          var x:Date = a.fecha_hora;
          var y:Date = b.fecha_hora;
          if((a.ind_fech_gest&&b.ind_fech_gest)||(!a.ind_fech_gest&&!b.ind_fech_gest)){
            return ((x<y) ? 1 : ((x>y) ? -1: 0));
          }
          else if(a.ind_fech_gest){
            return -1;
          }
          else{
            return 1;
          }
          
        });
        break;
      case "1":
          this.listaSenales.sort((a:SenalesItem,b:SenalesItem)=>{
            var x:Date = a.fecha_hora;
            var y:Date = b.fecha_hora;
            if((a.ind_fech_gest&&b.ind_fech_gest)||(!a.ind_fech_gest&&!b.ind_fech_gest)){
              return ((x<y) ? -1 : ((x>y) ? 1: 0));
            }
            else if(a.ind_fech_gest){
              return -1;
            }
            else{
              return 1;
            }
          });
        break;
      case "2":
        this.listaSenales.sort((a,b)=>{
          var x:string = a.cod_usuario;
          var y:string = b.cod_usuario;
          if((a.ind_fech_gest&&b.ind_fech_gest)||(!a.ind_fech_gest&&!b.ind_fech_gest)){
            return ((x<y) ? 1 : ((x>y) ? -1: 0));
          }
          else if(a.ind_fech_gest){
            return -1;
          }
          else{
            return 1;
          }
        });
        break;
      case "3":
          this.listaSenales.sort((a,b)=>{
            var x:string = a.cod_usuario;
            var y:string = b.cod_usuario;
            if((a.ind_fech_gest&&b.ind_fech_gest)||(!a.ind_fech_gest&&!b.ind_fech_gest)){
              return ((x<y) ? -1 : ((x>y) ? 1: 0));
            }
            else if(a.ind_fech_gest){
              return -1;
            }
            else{
              return 1;
            }
          });
        break;
    }

  }

  filtrarEtiquetas(valorSelect:string){
    this.filtroEtiqueta = Number.parseInt(valorSelect);
    this.filtroEtiqueta--;
    this.filtrar();    
  }

  filtrarUsuarios(valorSelect:string){
    this.filtroUsuario = Number.parseInt(valorSelect);
    this.filtroUsuario--;
    this.filtrar();
  }

  filtrar(){
    var etiqueta:EtiquetaItem;
    var usuario:string;
    if(this.filtroEtiqueta>=0 && this.filtroUsuario>=0){
      etiqueta=this.cop.etiquetas[this.filtroEtiqueta];
      usuario=this.cop.usuarios[this.filtroUsuario];
      this.listSenalesMostradas=this.listaSenales.filter(
        x=>{
          if(x.cod_etiqueta==etiqueta.cod_etiqueta && x.cod_usuario==usuario){
            return true;
          }
          return false;
        }
      );
    }
    else if (this.filtroUsuario>=0){
      usuario=this.cop.usuarios[this.filtroUsuario];
      this.listSenalesMostradas=this.listaSenales.filter(
        x=>{
          if(x.cod_usuario===usuario){
            return true;
          }
          return false;
        }
      );
    }else if (this.filtroEtiqueta>=0){
      etiqueta=this.cop.etiquetas[this.filtroEtiqueta];
      this.listSenalesMostradas=this.listaSenales.filter(
        x=>{
          if(x.cod_etiqueta==etiqueta.cod_etiqueta){
            return true;
          }
          return false;
        }
      );
    }else{
      this.listSenalesMostradas=this.listaSenales;
    }
  }
  
  private cargarLink(url){
    var preview:MatLinkPreviewComponent=new MatLinkPreviewComponent(new MatLinkPreviewService(this.http));
    return preview.linkPreviewService.fetchLink(url);
  }
  abrirModal(titulo:string,botonFin:string):Promise<any>{
    var etiquetas:Array<string>=new Array<string>();
    this.cop.etiquetas.forEach(etiqueta=>etiquetas.push(etiqueta.desc_etiqueta));
    var data=[
      {
        input:"inputField",
        controlName:"enlace",
        placeHolder:"Introduce una URL",
        data:""
      },
      {
        input:"inputField",
        controlName:"descripcion",
        placeHolder:"Escribe una descripcion a la cop",
        data:""
      },
      {
        input:"selectField",
        controlName:"etiqueta",
        placeHolder:"Selecciona una etiqueta",
        data:{
          data:etiquetas,
          seleccionado:""
        }
      }
    ];
    var config={
      data:data,
      titulo:titulo,
      botonFin:botonFin
    };
    return this.modalService.abrirModal(config);
  }

  nuevaSenal(){
    this.abrirModal("Alta Señal","Alta").then(
      data=>{
        if(data!=null){
          this.cargarLink(data.enlace).subscribe(
            response=>{
              console.log(response);
              var titulo=response.title;
              var imagen=response.image;
              var cod_etiqueta=this.cop.etiquetas.find(etiquita=>etiquita.desc_etiqueta==data.etiqueta).cod_etiqueta;
              this.senalesService.nuevaSenal(this.cop.cod_org,this.cop.cod_esp,
                this.cop.cod_cop,this.usuarioLogeado.cod_usuario,
                cod_etiqueta, data.descripcion, data.enlace,titulo,imagen).subscribe(
                  response=>{
                    console.log(response);
                    var alert:Alerta;
                    if(response.error==0 && response.aniadido>0){
                      
                      alert = {
                        message:"Señal añadida correctamente.", 
                        type:'success'
                      };
                      this.cargarSenales();
                    }
                    else{
                      alert = {
                        message:"No se ha podido añadir la señal.", 
                        type:'warning'
                      };
                    }
                    this.abrirAlerta(alert);
                  },
                  err=>{
                    let alert:Alerta = {
                      message:"Error con el servidor",
                      type:'danger'
                    };
                    this.abrirAlerta(alert);
                  }
                );
            }
          );
          
        }
      }
    );
  }


  abrirAlerta(alerta:Alerta){
    let modalRef:NgbModalRef;
    modalRef=this.ngbModalService.open(AlertGenericoComponent, {centered:true});
    (<AlertGenericoComponent>modalRef.componentInstance).alert=alerta;
  }

  curar(){
   this.curando=!this.curando;
  }

}

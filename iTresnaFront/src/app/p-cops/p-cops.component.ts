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


@Component({
  selector: 'app-p-cops',
  templateUrl: './p-cops.component.html',
  styleUrls: ['./p-cops.component.css']
})

export class PCopsComponent implements OnInit {
  private usuarioLogeado:Usuario;
  private cod_esp:number;
  private cod_cop:number;
  private listaSenales:SenalesItem[]=[];
  listSenalesMostradas:SenalesItem[]=[];
  cop:CopsItem=new CopsItem();
  espacio:EspaciosItem = new EspaciosItem();
  selected: string = '';
  private filtroEtiqueta:number=-1;
  private filtroUsuario:number=-1;
  
  private listaCops:CopsItem[]=[];
  private curando=false;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private espaciosService:EspaciosService,
    private copsService:CopsService,
    private senalesService:SenalesService,
    private dialog:MatDialog,
    private modalService:NgbModal
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
  cambiarCopSeleccion(i:number){
    if(this.cod_cop=i){
      this.cod_cop=i;
    }
  }
  cambiarCop(cod_cop:number){
    console.log(cod_cop);
  }
  tienePermisos():boolean{
    var cod_org_actual=this.cop.cod_org;
    var permisos=this.usuarioLogeado.permisos.filter(x=>x.cod_esp===this.cod_esp && x.cod_cop===this.cod_cop);
    if(permisos.length>0){
      return permisos[0].ind_admin||this.usuarioLogeado.tip_usuario==1||
        cod_org_actual==this.usuarioLogeado.cod_org;
    }
    return this.usuarioLogeado.tip_usuario==1||
      cod_org_actual==this.usuarioLogeado.cod_org;
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

  nuevaSenal(){
    const dialofConfig = new MatDialogConfig();
    dialofConfig.autoFocus=true;
    dialofConfig.minWidth="50%";
    dialofConfig.data={
      etiquetas:this.cop.etiquetas
    }
    const dialogRef=this.dialog.open(ModalSenalComponent,dialofConfig);
    
    dialogRef.afterClosed().subscribe(
      data=>{
        if(data!=null){
          this.senalesService.nuevaSenal(this.cop.cod_org,this.cop.cod_esp,
          this.cop.cod_cop,this.usuarioLogeado.cod_usuario,
          data.etiqueta, data.descripcion, data.url).subscribe(
            response=>{
              if(response.error!=0 && response.aniadido==0){
                let alert:Alerta = {
                  message:"No se ha podido añadir la señal", 
                  type:'danger'
                };
                this.abrirAlerta(alert);
              }
              else if(response.error==0 && response.aniadido==1){
                let alert:Alerta = {
                  message:"Señal añadida correctamente", 
                  type:'success'
                };
              this.abrirAlerta(alert);
              }
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
      }
    );
    
  }
  abrirAlerta(alerta:Alerta){
    let modalRef:NgbModalRef;
    modalRef=this.modalService.open(AlertGenericoComponent, {centered:true});
    (<AlertGenericoComponent>modalRef.componentInstance).alert=alerta;
    console.log(modalRef.componentInstance);
  }

  curar(){
   this.curando=!this.curando;
  }

}

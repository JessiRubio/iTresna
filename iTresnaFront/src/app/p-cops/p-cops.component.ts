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
  private listSenalesMostradas:SenalesItem[]=[];
  private cop:CopsItem=new CopsItem();
  private espacio:EspaciosItem = new EspaciosItem();
  selected: string = '';
  private filtroEtiqueta:number=-1;
  private filtroUsuario:number=-1;

  
  
  constructor(
    private route: ActivatedRoute,
    private espaciosService:EspaciosService,
    private copsService:CopsService,
    private senalesService:SenalesService,
    private dialog:MatDialog
    ) {}

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.route.queryParams.subscribe(params => {
      this.cod_cop = params['copSeleccionado'];
      this.cod_esp = params['codEspacio'];
      this.cargarEsp();
      this.cargarCop();
      this.cargarSenales();
    });
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
          console.log(res);
          if(res.error==0){
            this.cop=res.cop;
          }
        },
        err=>{

        }
      );
  }
  selectChangeHandler (event: any) {
    this.selected = event.target.value;
    console.warn(this.selected);
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

      }
    );
  }
  cambiarCopSeleccion(i:number){
    if(this.cod_cop=i){
      this.cod_cop=i;
    }
  }
  volverAtras(item){
    console.warn("TODO esta funcion aun esta por hacer, volvera a la pestaña anterior seleccionando el espacio")
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
  ordenar(valorSelect:string){
    switch(valorSelect){
      case "0":
        this.listaSenales.sort((a,b)=>{
          var x:Date = a.fecha_hora;
            var y:Date = b.fecha_hora;
            return ((x<y) ? 1 : ((x>y) ? -1: 0));
        });
        break;
      case "1":
        console.log("ascendente");

          this.listaSenales.sort((a:SenalesItem,b:SenalesItem)=>{
            var x:Date = a.fecha_hora;
            var y:Date = b.fecha_hora;
            return ((x<y) ? -1 : ((x>y) ? 1: 0));
          });
        break;
      case "2":
        this.listaSenales.sort((a,b)=>{
          var x:string = a.cod_usuario;
          var y:string = b.cod_usuario;
          return ((x<y) ? 1 : ((x>y) ? -1: 0));
        });
        break;
      case "3":
          this.listaSenales.sort((a,b)=>{
            var x:string = a.cod_usuario;
            var y:string = b.cod_usuario;
            return ((x<y) ? -1 : ((x>y) ? 1: 0));
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
    console.log(this.listaSenales);
    console.log(this.filtroEtiqueta);
    console.log(this.filtroUsuario)
    if(this.filtroEtiqueta>=0 && this.filtroUsuario>=0){
      console.log("filtro etiqueta y nombre");
      etiqueta=this.cop.etiquetas[this.filtroEtiqueta];
      usuario=this.cop.usuario[this.filtroUsuario];
      this.listSenalesMostradas=this.listaSenales.filter(
        x=>{
          if(x.cod_etiqueta==etiqueta.cod_etiqueta && x.cod_usuario===usuario){
            return true;
          }
          return false;
        }
      );
    }
    else if (this.filtroUsuario>0){
      console.log("filtro nombre");
      usuario=this.cop.usuario[this.filtroUsuario];
      this.listSenalesMostradas=this.listaSenales.filter(
        x=>{
          if(x.cod_usuario===usuario){
            return true;
          }
          return false;
        }
      );
    }else if (this.filtroEtiqueta>0){
      console.log("filtro etiqueta");
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
        var senal={"cod_org":this.cop.cod_org,
                    "cod_esp":this.cod_esp,
                    "cod_cop":this.cod_cop,
                    "cod_etiqueta":data.etiqueta,
                    "desc_senal":data.descripcion,
                    "enlace":data.url,
                    "cod_usuario":this.usuarioLogeado.cod_usuario};
        this.senalesService.nuevaSenal(senal).subscribe(
          res=>{
            if(res.error==1){
              this.nuevaSenal();
            }
          },
          err=>{

          }
        )
      }
    );
  }
}

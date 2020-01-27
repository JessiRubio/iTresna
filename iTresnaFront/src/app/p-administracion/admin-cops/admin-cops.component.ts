import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../clases/usuario';
import { EspaciosItem } from './../../clases/espaciosItem';
import { EspaciosService } from '../../servicios/espacios.service';
import {CopsService} from './../../servicios/cops.service';
import { CopsItem } from '../../clases/copsitem';
import { EtiquetaItem } from '../../clases/copsitem';
import { ModalAdminCopsComponent } from './../../modal-admin-cops/modal-admin-cops.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
    private dialog:MatDialog
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
  nuevo(){

  }
  editar(cod_org,cod_esp,cod_cop){
    this.copsService.getCop(cod_org,cod_esp,cod_cop).subscribe(
      respose=>{
        if(respose.error==0)
          this.editarCop(respose.cop);
      },
      error=>{
        window.alert("Error de conexion con el servidor");
      }
    );
  }
  openModal(cop:CopsItem):Observable<any>{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.minWidth="50%";
    dialogConfig.data=[
      {
        input:"inputField",
        controlName:"nombre",
        placeHolder:"Escribe el nombre de la cop",
        data:{
          desc:cop.desc_cop
        }
      },
      {
        input:"fileField",
        controlName:"imagen",
        placeHolder:"Selecciona un archivo",
        data:{
          desc:""
        }
      },
    ];
    const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
    return dialogRef.afterClosed();
  }

  
  editarCop(cop:CopsItem){
    this.openModal(cop).subscribe(
      data=>{
        if(data!=null){
          var file="";
          if(data.imagen!=null){
            var reader = new FileReader();
            reader.readAsDataURL(data.imagen);
            reader.onload = () =>{
              this.modificar(cop.cod_org,
                            cop.cod_esp,
                            cop.cod_cop,
                            data.nombre,
                            reader.result.toString().split(',')[1]);
            };
            
          }else{
            this.modificar(cop.cod_org,cop.cod_esp,cop.cod_cop,data.nombre,"");
          }
        }
      }
    );
  
  }
  addCop(){
    var cop:CopsItem=new CopsItem();
    cop.cod_org=this.espacios[this.selected].cod_org;
    cop.cod_esp=this.espacios[this.selected].cod_esp;
    this.openModal(cop).subscribe(
      data=>{
        if(data!=null){
          var file="";
          if(data.imagen!=null){
            var reader = new FileReader();
            reader.readAsDataURL(data.imagen);
            reader.onload = () =>{
              this.nuevaCop(cop.cod_org,
                            cop.cod_esp,
                            data.nombre,
                            reader.result.toString().split(',')[1]);
            };
            
          }else{
            this.nuevaCop(cop.cod_org,cop.cod_esp,data.nombre,"");
          }
        }
      }
    );
  }

  nuevaCop(cod_org:number,cod_esp:number,desc:string,imagen:string){
    this.copsService.nuevaCop(cod_org,cod_esp,desc,imagen).subscribe(
      response=>{
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
          console.log(response.cop.etiquetas);
        }else{
          window.alert("No se han podido cargar las etiquetas")
        }
      }
    )
  }


  private openModalEtiqueta(etiquetas:EtiquetaItem):Observable<any>{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.minWidth="50%";
    dialogConfig.data=[
      {
        input:"inputField",
        controlName:"etiqueta",
        placeHolder:"Escribe el nombre de la etiqueta",
        data:{
          desc:etiquetas.desc_etiqueta
        },
      }
    ];

    const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
    return dialogRef.afterClosed()
  }

  editarEtiqueta(etiquetas:EtiquetaItem){

    this.openModalEtiqueta(etiquetas).subscribe(
      data=>{
        if(data!=null){
        
            this.modificarEtiquetas(data.etiqueta,etiquetas.cod_etiqueta);
            console.log(data.etiqueta);
           
          }else{
            this.modificarEtiquetas(data.etiqueta,etiquetas.cod_etiqueta);
            
          }
        }
      
    );

}

modificarEtiquetas(desc_etiqueta, cod_etiqueta){
  this.copsService.modificarEtiqueta(desc_etiqueta, cod_etiqueta)
  .subscribe(
    response=>{
      location.reload();
    },
    error=>{
      console.log(error);
    }
  );
}


borrarEtiqueta(etiquetas:EtiquetaItem){
  if(window.confirm("¿Estas seguro de querer eliminar la Etiqueta?")){
    this.copsService.eliminarEtiqueta(etiquetas.cod_etiqueta,etiquetas.desc_etiqueta).subscribe(
      response=>{
        location.reload();
        
      },
      error=>{
        console.log(error);
      }
    );
  }
}

addEtiqueta(){
  var cop:CopsItem=new CopsItem();
  
  var etiquetas:EtiquetaItem=new EtiquetaItem();
  cop.cod_org=this.cops[this.copSelected].cod_org;
  cop.cod_esp=this.cops[this.copSelected].cod_esp;
  cop.cod_cop=this.cops[this.copSelected].cod_cop;
  
  this.openModalEtiqueta(etiquetas).subscribe(
    data=>{
      if(data!=null){
            this.nuevaEtiqueta(
                          cop.cod_cop,
                          cop.cod_esp,
                          cop.cod_org,
                          data.etiqueta,
                          );
            

                        
          
          
        }else{
          this.nuevaEtiqueta(
            cop.cod_cop,
            cop.cod_esp,
            cop.cod_org,
            data.etiqueta,
            );
          }
        });
      }


      nuevaEtiqueta(cod_cop:number,cod_esp:number,cod_org:number,desc_etiqueta:string){
        this.copsService.nuevaEtiqueta(cod_cop,cod_esp,cod_org,desc_etiqueta).subscribe(
          response=>{
            location.reload();
            
            
          },
          error=>{
            console.log(error);
          }
        )
      }

  atrasEtiquetas(){
    this.showEtiquetas =false;
    this.showCops =true;
  }
}

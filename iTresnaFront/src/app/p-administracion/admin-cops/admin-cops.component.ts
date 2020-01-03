import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../clases/usuario';
import { EspaciosItem } from './../../clases/espaciosItem';
import { EspaciosService } from '../../servicios/espacios.service';
import {CopsService} from './../../servicios/cops.service';
import { CopsItem } from '../../clases/copsitem';
import { ModalAdminCopsComponent } from './../../modal-admin-cops/modal-admin-cops.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-cops',
  templateUrl: './admin-cops.component.html',
  styleUrls: ['./admin-cops.component.css']
})
export class AdminCopsComponent implements OnInit {
  usuarioLogeado:Usuario;
  espacios:EspaciosItem[]=[];
  cops:CopsItem[]=[];
  selected=0;
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
          this.editarItem(respose.cop);
      },
      error=>{
        window.alert("Error de conexion con el servidor");
      }
    );
  }
  editarItem(cop:CopsItem){
    var etiquetas:any[]=[];
    if(cop.etiquetas!=null){
      cop.etiquetas.forEach(x=>{
        etiquetas.push({"cod":x.cod_etiqueta,"desc":x.desc_etiqueta});
      });
    }
   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.minWidth="50%";
    dialogConfig.data=[
      {
        input:"inputField",
        controlName:"nombre",
        placeHolder:"Escribe el nombre de la cop",
        data:{
          cod:cop.cod_cop,
          desc:cop.desc_cop
        }
      },
      {
        input:"fileField",
        controlName:"imagen",
        placeHolder:"Selecciona un archivo",
        data:{
          cod:0,
          desc:""
        }
      },
      {
        input:"selectField",
        controlName:"etiquetas",
        placeHolder:"Selecciona una etiqueta",
        data:etiquetas
      }
    ];
    const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data=>{
        if(data!=null){
          console.log(data);
        }
      }
    );
  
  }
  borrar(cop:CopsItem){

  }
}

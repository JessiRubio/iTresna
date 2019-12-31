import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../clases/usuario';
import { EspaciosItem } from './../../clases/espaciosItem';
import { EspaciosService } from '../../servicios/espacios.service';
import {CopsService} from './../../servicios/cops.service';
import { CopsItem } from '../../clases/copsitem';
import { ModalAdminCopsComponent } from './modal-admin-cops/modal-admin-cops.component';
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
  editar(cop:CopsItem){
      const dialofConfig = new MatDialogConfig();
      dialofConfig.autoFocus=true;
      dialofConfig.minWidth="50%";
      dialofConfig.data={
        nombre:cop.desc_cop,
        img:cop.img_cop,
        etiquetas:cop.etiquetas
      }
      const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialofConfig);
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

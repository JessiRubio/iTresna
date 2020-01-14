import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { EspaciosItem } from '../../clases/espaciosItem';
import { EspaciosService } from '../../servicios/espacios.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalAdminCopsComponent } from '../../modal-admin-cops/modal-admin-cops.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.css']
})
export class EspaciosComponent implements OnInit {

  usuarioLogado:Usuario;
  cod_org:number;
  listaEspacios:EspaciosItem[];
  constructor(private espaciosService:EspaciosService,
    private usuarioService:UsuariosService,
    private dialog:MatDialog) 
    { 
      this.listaEspacios=[];
    }

  ngOnInit() {
    this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
    this.cod_org=this.usuarioLogado.cod_org;
    this.cargarListaEspacios();
  }

  cargarListaEspacios(){
    this.espaciosService.getEspacios(this.cod_org).subscribe(
          res =>{
            if(res.error == 0){
              this.listaEspacios=res.espacios;
            }
          },
          err =>{

          }
      );
  }

  setIndCuracion(item:EspaciosItem){
    if(item.ind_esp_curacion){
      item.ind_esp_curacion = false;
    }
    else{
      item.ind_esp_curacion = true;
    }
    this.espaciosService.updateEspacio(item).subscribe(
      res =>{
        console.log(res);
      },
      err=>{

      }
    );
  }
  editar(cod_org:number,cod_esp:number){
    this.espaciosService.getEspacio(cod_org,cod_esp).subscribe(
      response=>{
        this.editarEspacio(response.espacio);
      }
    );
  }
  private editarEspacio(espacio:EspaciosItem){
    this.modalResponse(espacio).subscribe(
      data=>{
        if(data!=null){
          espacio.desc_esp=data.nombre;
          espacio.ind_esp_curacion=data.curacion;
          espacio.orden=data.orden
          this.espaciosService.updateEspacio(espacio).subscribe(
            response=>{
              console.log(response);
              location.reload();
            }
          );
        }        
      }
    );
  }
  private modalResponse(espacio:EspaciosItem):Observable<any>{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.minWidth="50%";
    dialogConfig.data=[
      {
        input:"inputField",
        controlName:"nombre",
        placeHolder:"Escribe el nombre de la cop",
        data:{
          desc:espacio.desc_esp
        },
        
      },
      {
        input:"checkboxField",
        controlName:"curacion",
        placeHolder:"Se puede curar",
        data:{
          desc:espacio.ind_esp_curacion
        }
      },
      {
        input:"inputField",
        controlName:"orden",
        placeHolder:"Pone el orden en el que aparecera el esapcio",
        data:{
          desc:espacio.orden
        }
      }
    ];

    const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
    return dialogRef.afterClosed()
  }
  private addEspacio(){
    var espacio=new EspaciosItem();
    espacio.desc_esp="";
    espacio.orden=0;
    espacio.ind_esp_curacion=false;
    this.modalResponse(espacio).subscribe(
      data=>{
        if(data.nomnre!="" && data.orden!=0){
          var espacio=new EspaciosItem();
          espacio.desc_esp=data.nombre;
          espacio.ind_esp_curacion=data.curacion;
          espacio.orden=data.orden;
          console.log(espacio);
          this.espaciosService.addEspacio(espacio).subscribe(
            response=>{
              console.log(response);
              location.reload();
            }
          );
        }        
      }
    );
  }
}

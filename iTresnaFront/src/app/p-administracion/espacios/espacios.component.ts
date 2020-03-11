import { Component, OnInit, ɵConsole } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { EspaciosItem } from '../../clases/espaciosItem';
import { EspaciosService } from '../../servicios/espacios.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalAdminCopsComponent } from '../../modal-admin-cops/modal-admin-cops.component';
import { Observable } from 'rxjs';
import { ModalServiceService } from '../../servicios/modal-service.service';
import { doesNotThrow } from 'assert';

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
    private dialog:MatDialog,
    private modalService:ModalServiceService) 
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
    this.abrirModal(espacio,"Modificar Espacio","Modificar").then(
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
      },
      error=>{
        //Nos da igual si el modal se ha cerrado sin guardar
      }
    );
  }
  private abrirModal(espacio:EspaciosItem,textoTitulo:string,textoBoton:string):Promise<any>{
    var dataConfig=[
      {
        input:"inputField",
        controlName:"nombre",
        placeHolder:"Escribe el nombre de la cop",
        data:espacio.desc_esp,
        
      },
      {
        input:"checkboxField",
        controlName:"curacion",
        placeHolder:"Se puede curar",
        data:espacio.ind_esp_curacion
      },
      {
        input:"numberField",
        controlName:"orden",
        placeHolder:"Pone el orden en el que aparecera el espacio",
        data:espacio.orden
      }
    ];
    var config={
      titulo:textoTitulo,
      data:dataConfig,
      botonFin:textoBoton
    };
    return this.modalService.abrirModal(config);
  }
  

  public borrar(item:EspaciosItem){
    if(window.confirm("¿Estas seguro de eliminar el espacio seleccionado?")){
      this.espaciosService.deleteEspacio(item.cod_org,item.cod_esp).subscribe(
        respose=>{
          console.log(respose);
          if(respose.error==0){
            location.reload();
          }
        }
      )
    }
  }

  public addEspacio(){
    var espacio=new EspaciosItem();
    espacio.cod_org=this.cod_org;
    espacio.desc_esp="";
    espacio.orden=0;
    espacio.ind_esp_curacion=false;
    this.abrirModal(espacio,"Alta Espacio","Alta").then(
      data=>{
        if(data.nombre.length>0){
          espacio.desc_esp=data.nombre;
          espacio.ind_esp_curacion=data.curacion;
          espacio.orden=data.orden;
          this.espaciosService.addEspacio(espacio).subscribe(
            response=>{
              console.log("Se ha creado correctamente");
            }
          );
        }        
      },
      error=>{
        //Nos da igual si el modal se ha cerrado sin guardar
      }
    );
  }
}

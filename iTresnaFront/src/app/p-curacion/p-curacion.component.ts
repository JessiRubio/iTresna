import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SenalesItem } from '../clases/senales-item';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalAdminCopsComponent } from './../modal-admin-cops/modal-admin-cops.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SenalesService } from '../servicios/senales.service';
import { ModalServiceService } from '../servicios/modal-service.service';
import { Alerta } from './../clases/alerta'
import { AlertGenericoComponent } from './../alert-generico/alert-generico.component';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-p-curacion',
  templateUrl: './p-curacion.component.html',
  styleUrls: ['./p-curacion.component.css']
})
export class PCuracionComponent implements OnInit {

  @Input() senales:SenalesItem[];

  listaPrincipal:{nombre:string,senales:Array<SenalesItem>};
  eliminar:{nombre:string,senales:Array<SenalesItem>};
  nombreLista:string;
  listaSenales=Array<{nombre:string,senales:Array<SenalesItem>}>();
  allDropList:string[]=[];
  pruebaLista:SenalesItem[]=[];
  repetido:boolean=false;
  
  constructor(private dialog:MatDialog,
    private senalesService:SenalesService,
    private modalService:ModalServiceService,
    private alertModalService:NgbModal,
    private router:Router) { 
  }

  ngOnInit() {

    this.listaPrincipal=({nombre:"Señales",senales:this.senales});
    this.allDropList.push("Señales");
    
    var eliminarList:SenalesItem[]=[];
    this.eliminar={nombre:"Eliminar",senales:eliminarList};
    this.allDropList.push("Eliminar");
  }
  
  drop(event: CdkDragDrop<string[]>) {
 
    if (event.previousContainer === event.container) {
  
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  abrirModalListaNueva(titulo:string,botonFin:string,botonCancel:string){
    var data=[
      {
        input:"inputField",
        controlName:"nombreLista",
        placeHolder:"Nombre de la lista",
        data:this.nombreLista
      },
    ];
    var config={
      data:data,
      titulo:titulo,
      botonFin:botonFin,
      botonCancel:botonCancel
    }
    return this.modalService.abrirModal(config);
  }

  nuevaLista(){
    this.abrirModalListaNueva("Nueva lista","Añadir","Cancelar").then(
      data=>{
        if(data!=null){
          var pruebaLista:SenalesItem[]=[];
          this.repetido=false;

          if(this.listaSenales.length===0){
    
            this.allDropList.push(data.nombreLista);
            this.listaSenales.push({nombre:data.nombreLista,senales:pruebaLista});
          }
          else{
            for(var pos=0;pos<this.listaSenales.length;pos++){
         

              if(this.listaSenales[pos].nombre===data.nombreLista){
              
                this.repetido=true;
                let alert:Alerta = {
                  message:"Nombre de lista repitido",
                  type:'danger'
                };
                this.abrirAlerta(alert);
                
              }
            }

            if(this.repetido===false){
              this.allDropList.push(data.nombreLista);
              this.listaSenales.push({nombre:data.nombreLista,senales:pruebaLista});
            }
        }
      }
      else{ 
        console.log("Error")
      }
      
    },  
    error=>{
        //Nos da igual que se cierre el modal 
      });
            
  }

  finalizarCuracion(){
    var texto = "¿Esta seguro de que quiere eliminar las " + this.eliminar.senales.length + " que contiene la lista Eliminar?";
    this.abrirModalFinalizar("Finalizar curación",texto,"Si", "No").then(
      data=>{
        
        for(var j=0;j<this.eliminar.senales.length;j++){
        var cod_org = this.eliminar.senales[j].cod_org;
        var cod_esp = this.eliminar.senales[j].cod_esp;
        var cod_cop = this.eliminar.senales[j].cod_cop;
        var cod_senal = this.eliminar.senales[j].cod_senal;
        this.senalesService.deleteSenalCuracion(cod_org, cod_esp, cod_cop, cod_senal).subscribe(
          response =>{
          },
          error =>{
            window.alert("Error de conexion o fallo en servidor");
          }
        );
      }
      location.reload();
      },
      error=>{
        //Nos da igual que no se cierre correctamente
      }
    );

  }

  abrirModalFinalizar(titulo:string,label:string,botonFin:string, botonCancel:string):Promise<any>{
    var data=[
      
    ];
    var config={
      data:data,
      label:label,
      botonFin:botonFin,
      botonCancel:botonCancel,
      titulo:titulo
    };
    return this.modalService.abrirModalTexto(config);
  }


  abrirAlerta(alerta:Alerta){
    let modalRef:NgbModalRef;
    modalRef=this.alertModalService.open(AlertGenericoComponent, {centered:true});
    (<AlertGenericoComponent>modalRef.componentInstance).alert=alerta;

  }





}

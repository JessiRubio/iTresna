import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import jsPDF from 'jspdf';
import { SenalesItem } from '../../clases/senales-item';
import { SenalesService } from '../../servicios/senales.service';
import {PCuracionComponent} from './../p-curacion.component'
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalAdminCopsComponent } from './../../modal-admin-cops/modal-admin-cops.component';
import { Observable } from 'rxjs';
import { CopsItem } from 'src/app/clases/copsitem';
import { Usuario } from 'src/app/clases/usuario';
import { Alerta } from '../../clases/alerta'
import { AlertGenericoComponent } from '../../alert-generico/alert-generico.component';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.css']
})
export class DragDropListComponent implements OnInit{
 
  @Input() senales:SenalesItem[];
  @Input() allDropList:string[]=[];
  @Input() pruebaLista:SenalesItem[]; 
  @Input() nombre:string; 
  @Input() listaSenales=Array<{nombre:string,senales:Array<SenalesItem>}>();
  @Input() type:string;
  cod_org:number;
  cod_esp:number;
  cod_cop:number;
  cod_senal:number;
  nombreLista:string;
  cop:CopsItem=new CopsItem();
  usuarioLogeado:Usuario;
  
  modalTitulo:string;
  modalDescripcion:string;
  modalDepartamento:string;

  constructor(
    private senalesService:SenalesService,
    private pCuracionComponent:PCuracionComponent,
    private modalService:NgbModal,
    private dialog:MatDialog
    ) { 
    
  }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
   
  }

  drop(event: CdkDragDrop<string[]>) {
    //console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  
  eliminarLista(listaSenales:PCuracionComponent,senales:SenalesItem){
  
    for(var i= 0; i<this.pCuracionComponent.listaSenales.length; i++){

      //console.log(this.pCuracionComponent.listaSenales[i]);

      //Angular detecta que en las siguientes lineas hay errores y no compila
      // El codigo funciona, por el momento se ignora el error

      // @ts-ignore
      if(this.pCuracionComponent.listaSenales[i]===this.senales){

        this.pCuracionComponent.listaSenales.splice(i,i-1);

        // @ts-ignore
        for (var j =0; j<this.senales.senales.length; j++){
    
          // @ts-ignore
          this.cod_org=this.senales.senales[j].cod_org;
          // @ts-ignore
          this.cod_esp=this.senales.senales[j].cod_esp;
          // @ts-ignore
          this.cod_cop=this.senales.senales[j].cod_cop;
          // @ts-ignore
          this.cod_senal=this.senales.senales[j].cod_senal;

          this.borrarSenal(this.cod_org, this.cod_esp, this.cod_cop,this.cod_senal );

        }
        i=this.pCuracionComponent.listaSenales.length;

      }


    }


  }

  borrarSenal(cod_org:number, cod_esp:number, cod_cop:number, cod_senal:number){

    this.senalesService.deleteSenalCuracion(this.cod_org, this.cod_esp, this.cod_cop, this.cod_senal).subscribe(
      response =>{
      },
      error =>{
        window.alert("Error de conexion o fallo en servidor");
      }
    );
  }

  comprobarSiNoRelevanteOEliminar( nombreSenal:string):boolean{
    if(nombreSenal=="Señales"||nombreSenal=="Eliminar"){
      return false;
    }
    else return true;
  }

  openModalSenalRelevante():Observable<any>{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.minWidth="50%";
    dialogConfig.data=[
      
      {
        input:"inputField",
        controlName:"titulo",
        placeHolder:"Titulo",
        data:{
          desc:this.modalTitulo
        }
      },{
        input:"inputField",
        controlName:"departamento",
        placeHolder:"Departamento",
        data:{
          desc:this.modalDepartamento
        }
      },
      {
        input:"inputField",
        controlName:"descripcion",
        placeHolder:"Descripcion",
        data:{
          desc:this.modalDescripcion
        }
      },
      
    ];
    const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
    return dialogRef.afterClosed();
    
  }

  generarSenalRelevante(){

    var nombreDoc,titulo,departamento, descripcion;
    var links="";

    for(var i= 0; i<this.pCuracionComponent.listaSenales.length; i++){

      // @ts-ignore
      if(this.pCuracionComponent.listaSenales[i]===this.senales){

        this.nombreLista=this.pCuracionComponent.listaSenales[i].nombre;

        // @ts-ignore
        for (var j =0; j<this.senales.senales.length; j++){
         
          // @ts-ignore
          links=links+" \n\n"+this.senales.senales[j].enlace;

        }
        
        this.openModalSenalRelevante().subscribe(
            data=>{
              if(data!=null){
                nombreDoc = this.nombreLista;
                titulo = data.titulo;
                departamento = data.departamento;
                descripcion = data.descripcion;
                
                this.generarPDF(nombreDoc,titulo,departamento,descripcion,links);
                this.nuevaSenal(titulo,descripcion);
                
              }
              else{
                nombreDoc = this.nombreLista;
                titulo = data.titulo;
                departamento = data.departamento;
                descripcion = data.descripcion;

                this.generarPDF(nombreDoc,titulo,departamento,descripcion,links);
                this.nuevaSenal(titulo,descripcion);
                
                
              }
            }
          );
        

      }

    }

  }

  generarPDF(nombre:string, titulo:string, departamento:string, descripcion:string, links:string){
    var doc = new jsPDF();
    var link, desc;
  
    link=doc.splitTextToSize(links, 180);
    desc=doc.splitTextToSize(descripcion, 180);
    doc.text(titulo,10,20);
    doc.text("Departamento: "+departamento,10,30);
    doc.text(desc,10,40);
    doc.text("Enlaces relacionados:",10,60)
    doc.setTextColor(70, 130, 180);
    doc.text(link, 10, 65);
  
    doc.save(nombre + '.pdf');

  }

  nuevaSenal(titulo:string,descripcion:string){
  
    var etiqueta_relevante=4;
    var url_relevante="https";
    var img_relevante="https";
    var cod_relevante=1;
    var esp_relevante=1;

    this.senalesService.nuevaSenal(this.usuarioLogeado.cod_org,esp_relevante,
      cod_relevante,this.usuarioLogeado.cod_usuario,
      etiqueta_relevante, descripcion, url_relevante,titulo,img_relevante).subscribe(
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

  abrirAlerta(alerta:Alerta){
    let modalRef:NgbModalRef;
    modalRef=this.modalService.open(AlertGenericoComponent, {centered:true});
    (<AlertGenericoComponent>modalRef.componentInstance).alert=alerta;

  }

  
}

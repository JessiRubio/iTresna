import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import jsPDF from 'jspdf';
import { SenalesItem } from '../../clases/senales-item';
import { SenalesService } from '../../servicios/senales.service';
import {PCuracionComponent} from './../p-curacion.component'
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalAdminCopsComponent } from './../../modal-admin-cops/modal-admin-cops.component';
import { Observable } from 'rxjs';

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
  cod_org:number;
  cod_esp:number;
  cod_cop:number;
  cod_senal:number;
  nombreLista:string;
  

  modalTitulo:string;
  modalDescripcion:string;
  modalDepartamento:string;



 

  constructor(
    private senalesService:SenalesService,
    private pCuracionComponent:PCuracionComponent,
    private dialog:MatDialog
    ) { 
    //
  }

  ngOnInit() {
   
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
    console.log("entro a borrar");
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
          console.log(this.senales.senales[j].enlace);
          // @ts-ignore
          links=links+" \n"+this.senales.senales[j].enlace;

          console.log(links);

        
        }
        
        this.openModalSenalRelevante().subscribe(
            data=>{
              if(data!=null){
                nombreDoc = this.nombreLista;
                titulo = data.titulo;
                departamento = data.departamento;
                descripcion = data.descripcion;
                console.log(titulo);

                this.generarPDF(nombreDoc,titulo,departamento,descripcion,links);
                
              }
              else{
                nombreDoc = this.nombreLista;
                titulo = data.titulo;
                departamento = data.departamento;
                descripcion = data.descripcion;

                console.log(titulo);

                this.generarPDF(nombreDoc,titulo,departamento,descripcion,links);
                
                
              }
            }
          );
        
        console.log(links);

      }



    }


  }

  generarPDF(nombre:string, titulo:string, departamento:string, descripcion:string, links:string){
    var doc = new jsPDF();
    var link, desc;
    //var margin = {top: 10, right: 20, bottom: 10, left: 20};
    
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

  
}

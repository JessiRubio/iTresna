import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SenalesItem } from '../clases/senales-item';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalAdminCopsComponent } from './../modal-admin-cops/modal-admin-cops.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-p-curacion',
  templateUrl: './p-curacion.component.html',
  styleUrls: ['./p-curacion.component.css']
})
export class PCuracionComponent implements OnInit {
  @Input() senales:SenalesItem[];

  nombreLista:string;
  


  private listaSenales=Array<{nombre:string,senales:Array<SenalesItem>}>();
  allDropList:string[]=[];
  constructor(private dialog:MatDialog) { 
  }

  ngOnInit() {

    this.listaSenales.push({nombre:"Señales",senales:this.senales});
    this.allDropList.push("Señales");

    var list:SenalesItem[]=[];
    this.listaSenales.push({nombre:"Relevante",senales:list});
    this.allDropList.push("Relevante");

    var eliminarList:SenalesItem[]=[];
    this.listaSenales.push({nombre:"Eliminar",senales:eliminarList});
    this.allDropList.push("Eliminar");

  }
  
  drop(event: CdkDragDrop<string[]>) {
    //console.log(event);
    if (event.previousContainer === event.container) {
      console.log("interior")
      console.log(event.container);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("exterior");
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  
  openModalNuevaLista():Observable<any>{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.minWidth="50%";
    dialogConfig.data=[
      
      {
        input:"inputField",
        controlName:"nombreLista",
        placeHolder:"Nombre",
        data:{
          desc:this.nombreLista
        }
      },
      
    ];
    const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
    return dialogRef.afterClosed();
    
  }

  nuevaLista(){
      this.openModalNuevaLista().subscribe(
        data=>{
          if(data!=null){
            this.allDropList.push(data.nombreLista);
            this.listaSenales.push({nombre:data.nombreLista,senales:[]});
         
            }else{
              this.allDropList.push(data.nombreLista); 
              this.listaSenales.push({nombre:data.nombreLista,senales:[]});
              
              }
            });
            
    }


}

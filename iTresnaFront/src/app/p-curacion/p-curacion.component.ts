import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SenalesItem } from '../clases/senales-item';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalAdminCopsComponent } from '../modal-admin-cops/modal-admin-cops.component';

@Component({
  selector: 'app-p-curacion',
  templateUrl: './p-curacion.component.html',
  styleUrls: ['./p-curacion.component.css']
})
export class PCuracionComponent implements OnInit {
  @Input() senales:SenalesItem[];
  


  private listaSenales=Array<{nombre:string,senales:Array<SenalesItem>}>();
  allDropList:string[]=[];
  constructor(
    private dialog:MatDialog
  ) { 
  }

  ngOnInit() {

    this.listaSenales.push({nombre:"todasSenales",senales:this.senales});
    this.allDropList.push("todasSenales");


    var list:SenalesItem[]=[];
    this.listaSenales.push({nombre:"eliminar",senales:list});
    this.allDropList.push("eliminar");

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
  
  nuevaLista(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.minWidth="50%";
    dialogConfig.data=[
      {
        input:"inputField",
        controlName:"nombreSenalCurada",
        placeHolder:"Escribe el nombre de la nueva señal",
        data:{
          desc:""
        }
      },
    ];
    const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data=>{
        if(data!=null){
          if(data.nombreSenalCurada!=""){
            var tituloSenal:string=data.nombreSenalCurada;
            this.allDropList.push(tituloSenal);
            let list:SenalesItem[]=[];
            this.listaSenales.push({nombre:tituloSenal,senales:list});
          }
        }
      }
    );
  }
}

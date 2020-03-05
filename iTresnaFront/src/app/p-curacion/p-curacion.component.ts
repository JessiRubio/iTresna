import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SenalesItem } from '../clases/senales-item';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalAdminCopsComponent } from './../modal-admin-cops/modal-admin-cops.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-p-curacion',
  templateUrl: './p-curacion.component.html',
  styleUrls: ['./p-curacion.component.css']
})
export class PCuracionComponent implements OnInit {
  @Input() senales:SenalesItem[];

  nombreLista:string;
  prueba1:number=0;
  listaSenales=Array<{nombre:string,senales:Array<SenalesItem>}>();
  allDropList:string[]=[];
  pruebaLista:SenalesItem[]=[];
  constructor(private dialog:MatDialog,
    private router:Router) { 
  }

  ngOnInit() {

    this.listaSenales.push({nombre:"Señales",senales:this.senales});
    this.allDropList.push("Señales");

    var eliminarList:SenalesItem[]=[];
    this.listaSenales.push({nombre:"Eliminar",senales:eliminarList});
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
          var pruebaLista:SenalesItem[]=[];
          this.allDropList.push(data.nombreLista);
          this.listaSenales.push({nombre:data.nombreLista,senales:pruebaLista});
        }
        else{
          var pruebaLista:SenalesItem[]=[];
          this.allDropList.push(data.nombreLista);
          this.listaSenales.push({nombre:data.nombreLista,senales:pruebaLista});
          
        }
      }
    );
            
  }

  finalizarCuracion(){

    this.router.navigateByUrl("Principal");
  }


}

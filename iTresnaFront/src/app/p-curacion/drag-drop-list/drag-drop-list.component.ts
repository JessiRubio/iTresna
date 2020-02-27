import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.css']
})
export class DragDropListComponent implements OnInit{
  @Input() senales;
  @Input() allDropList;

  constructor() { }

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

  comprobarSiNoRelevanteOEliminar( nombreSenal:string):boolean{
    if(nombreSenal=="Señales"||nombreSenal=="Eliminar"){
      return false;
    }
    else return true;
  }

  generarSenalRelevante(){

  }

  eliminarLista(){

  }

  borrarSenal(){

  }
}

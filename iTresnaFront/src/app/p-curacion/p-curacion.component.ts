import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SenalesItem } from '../clases/senales-item';


@Component({
  selector: 'app-p-curacion',
  templateUrl: './p-curacion.component.html',
  styleUrls: ['./p-curacion.component.css']
})
export class PCuracionComponent implements OnInit {
  @Input() senales:SenalesItem[];
  


  private listaSenales=Array<{nombre:string,senales:Array<SenalesItem>}>();
  allDropList:string[]=[];
  constructor() { 
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
    console.warn("que habra un modal donde escoger el nombre de la lista, por ahora genera uno de prueba");
    this.allDropList.push("prueba");
    this.listaSenales.push({nombre:"prueba",senales:[]});
  }
}

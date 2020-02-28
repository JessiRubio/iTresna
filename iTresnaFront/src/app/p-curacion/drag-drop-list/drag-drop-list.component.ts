import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import jsPDF from 'jspdf';
import { SenalesItem } from '../../clases/senales-item';
import { SenalesService } from '../../servicios/senales.service';

@Component({
  selector: 'app-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.css']
})
export class DragDropListComponent implements OnInit{
  @Input() senales;
  @Input() allDropList;

  constructor(private senalesService:SenalesService) { }

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
    var nombreDoc,titulo,departamento, descripcion,links;

    nombreDoc = "hola";
    titulo = "Documento Señales relevantes";
    departamento = "Informatica";
    descripcion = "Prueba";
    links = ["link1","link2"];

    this.generarPDF(nombreDoc,titulo,departamento,descripcion,links);
  }

  generarPDF(nombre:string, titulo:string, departamento:string, descripcion:string, links:string[]){
    var doc = new jsPDF();

    doc.text(titulo,10,10);
    doc.text(departamento,10,20);
    doc.text(departamento,10,30);

    var posicion = 40;
    for(var i=0; i<links.length; i++){
      doc.text(links[i],10,posicion);
      posicion = posicion +10;
    }
    doc.save(nombre + '.pdf')
  }

  eliminarLista(){
    var i=0;
    for(i; i<this.allDropList.length; i++){
      this.borrarSenal(this.allDropList[i]);
    }

    if(i==this.senales.length){
      this.allDropList=[];
    }
  }

  borrarSenal(senal:SenalesItem){
    this.senalesService.deleteSenal(senal).subscribe(
      response =>{
      },
      error =>{
        window.alert("Error de conexion o fallo en servidor");
      }
    );
  }
}

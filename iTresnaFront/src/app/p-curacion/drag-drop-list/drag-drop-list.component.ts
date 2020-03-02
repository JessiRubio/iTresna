import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import jsPDF from 'jspdf';
import { SenalesItem } from '../../clases/senales-item';
import { SenalesService } from '../../servicios/senales.service';
import {PCuracionComponent} from './../p-curacion.component'

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



 

  constructor(
    private senalesService:SenalesService,
    private pCuracionComponent:PCuracionComponent
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
  
    //console.log(this.pCuracionComponent.listaSenales[0]);
    //console.log(this.pCuracionComponent.listaSenales);
    //console.log(this.pCuracionComponent.listaSenales.length);
    //console.log(listaSenales.nombreLista);
    //console.log("hola",this.senales);
    
    var i=0;

    for(i; i<this.pCuracionComponent.listaSenales.length; i++){


      console.log(this.pCuracionComponent.listaSenales[i]);
      if(this.pCuracionComponent.listaSenales[i]===this.senales){
        console.log("si");
        this.pCuracionComponent.listaSenales.splice(i,i-1);
        console.log(this.senales.senales.length);
        
        

        for (var j =0; j<this.senales.senales.length; j++){
          console.log(this.senales.senales[j].cod_senal);
          this.cod_org=this.senales.senales[j].cod_org;
          this.cod_esp=this.senales.senales[j].cod_esp;
          this.cod_cop=this.senales.senales[j].cod_cop;
          this.cod_senal=this.senales.senales[j].cod_senal;

          this.borrarSenal(this.cod_org, this.cod_esp, this.cod_cop,this.cod_senal );





        }


        i=this.pCuracionComponent.listaSenales.length;



      } else{
        console.log("no");
      }



    }

  /*
    var i=0;
    console.log(this.pruebaLista.length);
    console.log(this.listaSenales)
    this.listaSenales.pop;
    for(i; i<this.pruebaLista.length; i++){
      console.log(this.pruebaLista.length);
      console.log("entro al for");
      this.borrarSenal(this.pruebaLista[i]);
    }

    if(i==this.senales.length){
      this.pruebaLista=[];
    }
    */


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

  
}

import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SenalesItem } from '../../clases/senales-item';
import { SenalesService } from '../../servicios/senales.service';
import {PCuracionComponent} from './../p-curacion.component';
import { ModalAdminCopsComponent } from './../../modal-admin-cops/modal-admin-cops.component';
import { Observable } from 'rxjs';
import { CopsItem } from 'src/app/clases/copsitem';
import { Usuario } from 'src/app/clases/usuario';
import { Alerta } from '../../clases/alerta'
import { AlertGenericoComponent } from '../../alert-generico/alert-generico.component';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalServiceService } from '../../servicios/modal-service.service';


@Component({
  selector: 'app-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.css']
})
export class DragDropListComponent implements OnInit{
 
  @Input() senales:any;
  @Input() allDropList:string[]=[];
  @Input() pruebaLista:SenalesItem[]; 
  @Input() nombre:string; 
  @Input() listaSenales=Array<{nombre:string,senales:Array<SenalesItem>}>();
  @Input() type:string;
  nombreLista:string;
  cop:CopsItem=new CopsItem();
  usuarioLogeado:Usuario;
  listaLinks=[];
  imgEnlace:string;
  item:any;

  constructor(
    private senalesService:SenalesService,
    private pCuracionComponent:PCuracionComponent,
    private alertModalService:NgbModal,
    private modalService:ModalServiceService,
    private modalSerive:ModalServiceService,
    ) { 
    
  }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
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



  abrirModalBorrar(titulo:string,label:string,botonFin:string, botonCancel:string):Promise<any>{
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

  eliminarLista(){

    this.abrirModalBorrar("Borrar lista","¿Desea eliminar la lista? En el caso de tener señales también se borrarán","Si", "No").then(
      data=>{

        for(var i= 0; i<this.pCuracionComponent.listaSenales.length; i++){
          if(this.pCuracionComponent.listaSenales[i]===this.senales){
            if(i===0){
              this.pCuracionComponent.listaSenales.splice(i,i+1);
            }
            else{
              this.pCuracionComponent.listaSenales.splice(i,i);
            }
            for (var j =0; j<this.senales.senales.length; j++){

              var cod_org=this.senales.senales[j].cod_org;
              var cod_esp=this.senales.senales[j].cod_esp;
              var cod_cop=this.senales.senales[j].cod_cop;
              var cod_senal=this.senales.senales[j].cod_senal;
              this.borrarSenal(cod_org, cod_esp, cod_cop, cod_senal);
            }
            i=this.pCuracionComponent.listaSenales.length;
          }

        }
    
      },  
      error=>{ 
      });
  }

  borrarSenal(cod_org:number, cod_esp:number, cod_cop:number, cod_senal:number){

    this.senalesService.deleteSenalCuracion(cod_org, cod_esp, cod_cop, cod_senal).subscribe(
      response =>{
        var alert:Alerta;
        if(response.error==0){
          alert = {
            message:"Señal borrada",
            type:'success'
          };
        }else{
          alert = {
            message:"No se ha podido eliminar la señal",
            type:'warning'
          };
        }
        this.abrirAlerta(alert);
      },
      error =>{
        let alert:Alerta = {
          message:"Error con el servidor",
          type:'danger'
        };
        this.abrirAlerta(alert);
      }
    );
  }

  comprobarSiNoRelevanteOEliminar( nombreSenal:string):boolean{
    if(nombreSenal=="Señales"||nombreSenal=="Eliminar"){
      return false;
    }
    else return true;
  }
  abrirModalSenalRelevante(titulo:string,botonFin:string):Promise<any>{
    var data=[
      
      {
        input:"inputField",
        controlName:"titulo",
        placeHolder:"Titulo",
        data:""
      },{
        input:"inputField",
        controlName:"departamento",
        placeHolder:"Departamento",
        data:""
      },
      {
        input:"inputField",
        controlName:"descripcion",
        placeHolder:"Descripcion",
        data:""
      },
    ];
    var config={
      data:data,
      titulo:titulo,
      botonFin:botonFin
    };
    return this.modalSerive.abrirModal(config);
  }

  generarSenalRelevante(){
    var nombreDoc,titulo,departamento, descripcion;
    var links="";
    var tituloRelevante="";
    for(var i= 0; i<this.pCuracionComponent.listaSenales.length; i++){

      if(this.pCuracionComponent.listaSenales[i]===this.senales){

        this.nombreLista=this.pCuracionComponent.listaSenales[i].nombre;

        for (var j =0; j<this.senales.senales.length; j++){
          this.listaLinks.push("\n"+this.senales.senales[j].enlace);
          this.imgEnlace=this.senales.senales[j].img_senal;

          //links=links+" \n\n"+this.senales.senales[j].enlace;
        }
        
        this.abrirModalSenalRelevante("Alta Senal Relevante","Alta").then(
          data=>{
            if(data!=null){
              nombreDoc = this.nombreLista;
              titulo = data.titulo;
              departamento = data.departamento;
              descripcion = data.descripcion;
              
              this.generarPDF(nombreDoc,titulo,departamento,descripcion,this.listaLinks);
              tituloRelevante= departamento+": "+titulo;
              this.nuevaSenal(tituloRelevante,descripcion);
              
            }
            else{
              nombreDoc = this.nombreLista;
              titulo = data.titulo;
              departamento = data.departamento;
              descripcion = data.descripcion;

              tituloRelevante= departamento+": "+titulo;
              this.generarPDF(nombreDoc,titulo,departamento,descripcion,this.listaLinks);
              this.nuevaSenal(tituloRelevante,descripcion);
              this.listaLinks=[];
            }
          },
          error=>{
            //Nosa da igual que se cierre el modal
          }
        );
      }
    }
  }

  generarPDF(nombre:string, titulo:string, departamento:string, descripcion:string, links){
    var doc = new jsPDF();

   /* var link, desc;
    link=doc.splitTextToSize(links, 180);
    desc=doc.splitTextToSize(descripcion, 180);
    doc.text(titulo,10,20);
    doc.text("Departamento: " + departamento,10,30);
    doc.text(desc,10,40);
    doc.text("Enlaces relacionados:",10,60)
    doc.setTextColor(70, 130, 180);
    doc.text(link, 10, 65);*/

    doc.autoTable({
      headStyles: { halign: 'center'},
      head: [['Titulo']],
      body: [
        ["\n"+titulo+"\n"],
      ],
    })

    doc.autoTable({
      headStyles: { halign: 'center'},
      head: [['Departamento']],
      body: [
        ["\n"+departamento+"\n"],
      ],
    })

    doc.autoTable({
      headStyles: { halign: 'center'},
      head: [['¿Por qué nos parece interesante? ¿Qué proyecto innovador podría llevarse adelante?']],
      body: [
        ["\n"+descripcion+"\n"],
      ],
    })

    doc.autoTable({
      headStyles: { halign: 'center'},
      head: [['Enlaces relacionados']],
      bodyStyles: {textColor: [0, 128, 255],  },
      body: [
          [links]
        
      ],
    })

    doc.save(nombre + '.pdf');
    
  }

  nuevaSenal(tituloRelevante:string,descripcion:string){
  
    var etiqueta_relevante=4;
    var url_relevante="https";
    var img_relevante=this.imgEnlace;
    var cod_relevante=1;
    var esp_relevante=1;

    this.senalesService.nuevaSenal(this.usuarioLogeado.cod_org,esp_relevante,
      cod_relevante,this.usuarioLogeado.cod_usuario,
      etiqueta_relevante, descripcion, url_relevante,tituloRelevante,img_relevante).subscribe(
        response=>{
          if(response.error!=0 && response.aniadido!=1){
            let alert:Alerta = {
              message:"No se ha podido añadir la señal", 
              type:'danger'
            };
            this.abrirAlerta(alert);
          }
          else{
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
    modalRef=this.alertModalService.open(AlertGenericoComponent, {centered:true});
    (<AlertGenericoComponent>modalRef.componentInstance).alert=alerta;

  }
  
}

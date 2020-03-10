import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SenalesItem } from '../clases/senales-item';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalAdminCopsComponent } from './../modal-admin-cops/modal-admin-cops.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SenalesService } from '../servicios/senales.service';

@Component({
  selector: 'app-p-curacion',
  templateUrl: './p-curacion.component.html',
  styleUrls: ['./p-curacion.component.css']
})
export class PCuracionComponent implements OnInit {

  @Input() senales:SenalesItem[];

  listaPrincipal:{nombre:string,senales:Array<SenalesItem>};
  eliminar:{nombre:string,senales:Array<SenalesItem>};
  nombreLista:string;
  listaSenales=Array<{nombre:string,senales:Array<SenalesItem>}>();
  allDropList:string[]=[];
  pruebaLista:SenalesItem[]=[];
  constructor(private dialog:MatDialog,
    private senalesService:SenalesService,
    private router:Router) { 
  }

  ngOnInit() {

    this.listaPrincipal=({nombre:"Señales",senales:this.senales});
    this.allDropList.push("Señales");
    
    var eliminarList:SenalesItem[]=[];
    this.eliminar={nombre:"Eliminar",senales:eliminarList};
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
    for (var i=0; i<this.listaSenales.length;i++){
      if(this.listaSenales[i].nombre==="Eliminar"){
        for(var j=0;j<this.listaSenales[i].senales.length;j++){
          var cod_org = this.listaSenales[i].senales[j].cod_org;
          var cod_esp = this.listaSenales[i].senales[j].cod_esp;
          var cod_cop = this.listaSenales[i].senales[j].cod_cop;
          var cod_senal = this.listaSenales[i].senales[j].cod_senal;
          this.senalesService.deleteSenalCuracion(cod_org, cod_esp, cod_cop, cod_senal).subscribe(
            response =>{
            },
            error =>{
              window.alert("Error de conexion o fallo en servidor");
            }
          );
        }

        if (j>=this.listaSenales[i].senales.length){
          location.reload();
        }
      }
    }
    
  }


}

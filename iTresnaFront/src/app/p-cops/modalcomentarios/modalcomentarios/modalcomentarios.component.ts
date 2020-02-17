import { Component, OnInit, Input, Inject   } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ComentariosService } from 'src/app/servicios/comentarios.service';
import { Comentario } from '../../../clases/comentario';
import { SenalesItem } from '../../../clases/senales-item';
import { Usuario } from  './../../../clases/usuario';
import { SenalesService } from '../../../servicios/senales.service';

@Component({
  selector: 'app-modalcomentarios',
  templateUrl: './modalcomentarios.component.html',
  styleUrls: ['./modalcomentarios.component.css']
})
export class ModalcomentariosComponent implements OnInit {

  @Input() senal:SenalesItem;
  @Input() comentario:Comentario;
  listaComentarios:Comentario[]=[];

  constructor(private http:HttpClient,
    private comentariosService:ComentariosService,
    private senalesService:SenalesService,
    private fb: FormBuilder,
    private dialogRef:MatDialogRef<ModalcomentariosComponent>,
    @Inject(MAT_DIALOG_DATA) data){ 
      this.senal=data.senal;
      this.senal.cod_senal=data.cod_senal;
    }

  ngOnInit() {

    this.cargarComentarios();
  }


  cargarComentarios(){
    this.comentariosService.getComentarios(this.senal.cod_senal)
        .subscribe(
          res =>{
            if(res.error == 0){
              this.listaComentarios=res.comentarios;
              console.log(res.comentarios);
              
            }
            else{
              
            }
          }, 
          err =>{ 
            console.log(err);

          } 
      );
  }

}

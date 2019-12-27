import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtiquetaItem } from '../../clases/copsitem';

@Component({
  selector: 'app-modalsenal',
  templateUrl: './modalsenal.component.html',
  styleUrls: ['./modalsenal.component.css']
})
export class ModalSenalComponent implements OnInit {
  form:FormGroup;
  etiquetas:EtiquetaItem[];
  selected;
  constructor(
    private fb: FormBuilder,
    private dialogRef:MatDialogRef<ModalSenalComponent>,
    @Inject(MAT_DIALOG_DATA) data){
      
      this.etiquetas=data.etiquetas;
      if(data.etiquetaSenal!=null){
        this.selected=data.etiquetaSenal;
        console.log(data.etiquetaSenal);
      }else{
        this.selected=this.etiquetas[0].cod_etiqueta;
      }
      this.form = this.fb.group({
        url:[data.url,Validators.required],
        descripcion:[data.descripcion,Validators.required],
        etiqueta:[this.selected,Validators.required]
      });
  }
  ngOnInit() {
  }
  save(){
    this.form.value.etiqueta=this.selected;
    this.dialogRef.close(this.form.value);
  }
}

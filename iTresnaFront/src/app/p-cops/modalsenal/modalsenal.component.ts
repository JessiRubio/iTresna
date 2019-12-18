import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  constructor(
    private fb: FormBuilder,
    private dialogRef:MatDialogRef<ModalSenalComponent>,
    @Inject(MAT_DIALOG_DATA) data:{etiquetas:EtiquetaItem[]}){

      this.etiquetas=data.etiquetas;

      this.form = this.fb.group({
        url:["",Validators.required],
        descripcion:["",Validators.required],
        etiqueta:[this.etiquetas[0],Validators.required]
      });
  }

  ngOnInit() {
  }

  save(){
    this.dialogRef.close(this.form.value);
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtiquetaItem } from '../../clases/copsitem';
import { MatLinkPreviewService, MatLinkPreviewComponent } from '@angular-material-extensions/link-preview';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-modalsenal',
  templateUrl: './modalsenal.component.html',
  styleUrls: ['./modalsenal.component.css']
})
export class ModalSenalComponent implements OnInit {
  form:FormGroup;
  etiquetas:EtiquetaItem[];
  preview:MatLinkPreviewComponent;
  selected;
  constructor(
    private http:HttpClient,
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
        etiqueta:[this.selected,Validators.required],
      });
  }
  ngOnInit() {
  }
  async save(){
    var preview:MatLinkPreviewComponent=new MatLinkPreviewComponent(new MatLinkPreviewService(this.http));
    console.log(this.preview);
    await this.preview.linkPreviewService.fetchLink(this.form.value.url).subscribe(
      response=>{
        console.log(response);
      }
    );
    this.form.value.etiqueta=this.selected;
    //this.dialogRef.close(this.form.value);
  }
}
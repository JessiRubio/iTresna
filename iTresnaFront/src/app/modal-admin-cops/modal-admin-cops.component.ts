import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-admin-cops',
  templateUrl: './modal-admin-cops.component.html',
  styleUrls: ['./modal-admin-cops.component.css']
})
export class ModalAdminCopsComponent implements OnInit {
  private controllerNames:string[]=[];
  intData;
  formGroup:FormGroup;
  
  constructor(
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef:MatDialogRef<ModalAdminCopsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any[]) 
    {
      this.intData=data;
      this.cargar();
      this.formGroup=this.formBuilder.group({
        nombre:new FormControl()
      });
    }
  cargar(){    
    this.intData.forEach(x=>{
      if(x.input==="inputField")
        this.controllerNames.push(x.controlName);
      
    });
  }
  ngOnInit(){
    this.formGroup=this.formBuilder.group({});
  }
  save(){
    this.dialogRef.close(this.formGroup.value);
  }
}

import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal-admin-cops',
  templateUrl: './modal-admin-cops.component.html',
  styleUrls: ['./modal-admin-cops.component.css']
})
export class ModalAdminCopsComponent implements AfterViewInit,OnInit {
  private controllerNames:string[]=[];
  private intData;
  private formGroup:FormGroup;
  
  constructor(
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef:MatDialogRef<ModalAdminCopsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any[]) 
    {
      this.intData=data;
      this.cargar();
    }
  cargar(){    
    this.intData.forEach(x=>{
      if(x.input==="inputField"){
        this.controllerNames.push(x.controlName);
      }
    });
  }
  ngOnInit(){
    this.formGroup=this.formBuilder.group({});
  }
  ngAfterViewInit(){
    this.formGroup=this.toFormGroup();
    console.log(this.formGroup);
  }
  toFormGroup():FormGroup{
    let group:any;
    this.controllerNames.forEach(x=>{
      group[x]=new FormControl();
    });
    return new FormGroup(group);
  }
  save(){
    location.reload();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Organizacion } from '../../clases/organizacion';
@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css']
})
export class OrganizacionComponent implements OnInit {
  private form:FormGroup;
  organizacion:Organizacion;
  img:string;

  constructor(private fBuilder: FormBuilder) {
    this.form=this.fBuilder.group({
      orgName:["",Validators.required],
      orgDesc:["",Validators.required],
      contacto:["",Validators.required],
      orgIcon:new FormControl(null)
    });
    this.organizacion=JSON.parse(localStorage.getItem("organizacion"));
    
  }

  ngOnInit() {
    if (this.organizacion.cod_org = null){
      location.reload();
    }
    this.form=this.fBuilder.group({
      orgName:[this.organizacion.desc_org,Validators.required],
      orgDesc:[this.organizacion.eslogan_org,Validators.required],
      contacto:[this.organizacion.contacto,Validators.required],
      orgIcon:new FormControl(null)
    });

    this.img=this.organizacion.img_org;
  }

  recargarPagina(){
    location.reload();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css']
})
export class OrganizacionComponent implements OnInit {
  private form:FormGroup;
  constructor(private fBuilder: FormBuilder) {
    this.form=this.fBuilder.group({
      orgName:["",Validators.required],
      orgDesc:["",Validators.required],
      orgIcon:new FormControl(null)
    });
  }

  ngOnInit() {
  }

}

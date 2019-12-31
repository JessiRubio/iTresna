import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-admin-cops',
  templateUrl: './modal-admin-cops.component.html',
  styleUrls: ['./modal-admin-cops.component.css']
})
export class ModalAdminCopsComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private fb: FormBuilder,
    private dialogRef:MatDialogRef<ModalAdminCopsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { }

  ngOnInit() {
  }

}

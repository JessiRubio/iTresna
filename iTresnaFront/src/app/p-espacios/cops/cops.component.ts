import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cops-component',
  templateUrl: './cops.component.html',
  styleUrls: ['./cops.component.css']
})
export class CopsComponent implements OnInit {

  nombre = "Relevante";

  descripcion = "Bienvenido al mundo de las ideas"

  constructor() { }

  ngOnInit() {
  }

}

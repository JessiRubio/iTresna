import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cops-component',
  templateUrl: './cops.component.html',
  styleUrls: ['./cops.component.css']
})
export class CopsComponent implements OnInit {

  nombre = "Relevante";

  numeroSenales = "1 señal";

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { CopsComponent } from './cops/cops.component';
import { CopsItem } from '../copsitem';

@Component({
  selector: 'app-p-espacios',
  templateUrl: './p-espacios.component.html',
  styleUrls: ['./p-espacios.component.css']
})
export class PEspaciosComponent implements OnInit {

  listaEspacios:String[]= ["Rutina de Observación",'Portafolio','Rutina de explotación','Informes'];
  listaCops:CopsItem[]=[new CopsItem("Relevante","1")];
  constructor() { }

  ngOnInit() {
  }

}

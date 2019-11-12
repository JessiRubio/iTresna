import { Component, OnInit } from '@angular/core';
import { CopsComponent } from './cops/cops.component';

@Component({
  selector: 'app-p-espacios',
  templateUrl: './p-espacios.component.html',
  styleUrls: ['./p-espacios.component.css']
})
export class PEspaciosComponent implements OnInit {

  listaMenu:String[]= ["Rutina de Observación",'Portafolio','Rutina de explotación','Informes'];
  lista:CopsComponent[];
  constructor() { }

  ngOnInit() {
  }

}

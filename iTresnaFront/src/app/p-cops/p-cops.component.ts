import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-cops',
  templateUrl: './p-cops.component.html',
  styleUrls: ['./p-cops.component.css']
})
export class PCopsComponent implements OnInit {
  
  listaEspacios:String[]= ["Rutina de Observación",'Portafolio','Rutina de explotación','Informes'];
  listaCops:String[]=["Relevante"];
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-senales',
  templateUrl: './senales.component.html',
  styleUrls: ['./senales.component.css']
})
export class SenalesComponent implements OnInit {

  titulo = "4 Trends in Big Data Innovation Governing the Future of Data Science";

  texto = "He leido este articulo y me ha parecido muy interesante, creo que podriamos tenerlo en cuenta para proyectos en el centro.";

  n = 0;

  Autor = "Jessica Rubio";

  constructor() { }

  ngOnInit() {
  }

}

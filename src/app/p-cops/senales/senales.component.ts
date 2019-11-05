import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-senales',
  templateUrl: './senales.component.html',
  styleUrls: ['./senales.component.css']
})
export class SenalesComponent implements OnInit {

  titulo = "noticion";

  texto = "Es maravilloso";

  n = 58;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-header-generico',
  templateUrl: './header-generico.component.html',
  styleUrls: ['./header-generico.component.css']
})
export class HeaderGenericoComponent implements OnInit {

  usuario:Usuario;
  constructor() { 
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }

  ngOnInit() {
  }

}

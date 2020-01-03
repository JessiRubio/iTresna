import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-p-administracion',
  templateUrl: './p-administracion.component.html',
  styleUrls: ['./p-administracion.component.css']
})
export class PAdministracionComponent implements OnInit {

  usuarioLogado:Usuario;

  constructor() { }

  ngOnInit() {
    this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
  }

}
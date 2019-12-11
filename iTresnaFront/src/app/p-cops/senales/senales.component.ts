import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SenalesItem } from '../../clases/senales-item';

@Component({
  selector: 'app-senales',
  templateUrl: './senales.component.html',
  styleUrls: ['./senales.component.css']
})
export class SenalesComponent implements OnInit {

  @Input() senal:SenalesItem;
  private titulo:String= "Lorem Ipsum";
  like(){
    console.warn("TODO esta funcion aun esta por hacer, te añadira como me gusta");
  }

  constructor(private router:Router) {
    this.router.events.subscribe((ev)=>{
      if(localStorage.length==0){
        this.router.navigateByUrl("");
      }
    });
   }

  ngOnInit() {
    this.cargarTituloPagina();
  }
  cargarTituloPagina(){
    console.warn("TODO esta funcion esta por hacer, cargara el titulo en la señal.")
  }

}

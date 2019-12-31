import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cop-component',
  templateUrl: './cop.component.html',
  styleUrls: ['./cop.component.css']
})
export class CopComponent implements OnInit {

  @Input() ind_admin:boolean;

  @Input() desc_cop:string;

  @Input() cantidad_senales:number;

  @Input() img:string;

 

  constructor() { 
  }
  ngOnInit() {
  }

}

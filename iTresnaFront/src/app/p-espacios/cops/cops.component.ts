import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cops-component',
  templateUrl: './cops.component.html',
  styleUrls: ['./cops.component.css']
})
export class CopsComponent implements OnInit {

  @Input() ind_admin:boolean;

  @Input() desc_cop:string;

  @Input() cantidad_senales:number;

  @Input() img:string;

 

  constructor() { 
  }
  ngOnInit() {
  }

}

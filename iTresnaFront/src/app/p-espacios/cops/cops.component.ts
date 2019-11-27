import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cops-component',
  templateUrl: './cops.component.html',
  styleUrls: ['./cops.component.css']
})
export class CopsComponent implements OnInit {

  @Input() desc_cop:string;

  @Input() cantidad_senales:number;

  constructor() { 
  }
      
  ngOnInit() {
  }

}

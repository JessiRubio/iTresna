import { DefaultIterableDiffer, Pipe, NgModule } from "@angular/core";
import { CopsItem } from "./copsitem";

@NgModule()
export class EspaciosItem{
    cod_org:number=0;
    cod_esp:number=0;
    desc_esp:string="";
    ind_esp_curacion:number=0;
    listaCop:CopsItem[];

    constructor(){
        this.listaCop=[];   
    }
   
   
}
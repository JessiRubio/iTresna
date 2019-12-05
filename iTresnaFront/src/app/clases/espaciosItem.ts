import { DefaultIterableDiffer, Pipe, NgModule } from "@angular/core";
import { CopsItem } from "./copsitem";

@NgModule()
export class EspaciosItem{
    cod_org:number;
    cod_esp:number;
    desc_esp:string;
    ind_esp_curacion:number;
    listaCop:CopsItem[]=[];

    constructor(){
        this.listaCop=[];   
    }
   
   
}
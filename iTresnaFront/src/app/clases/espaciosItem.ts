import { DefaultIterableDiffer } from "@angular/core";

export class EspaciosItem{
    cod_org:number;
    cod_esp:number;
    desc_esp:string;
    ind_esp_curacion:number;

    constructor(co:number,ce:number,de:string,iec:number){
        this.cod_org = co;
        this.cod_esp = ce;
        this.desc_esp = de;
        this.ind_esp_curacion = iec;
    }
}
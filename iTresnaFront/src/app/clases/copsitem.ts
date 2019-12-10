import { SenalesItem } from "./senales-item";

export class CopsItem{

    cod_org:number;
    cod_esp:number;
    cod_cop:number;
    desc_cop:string;
    img_cop:string;
    ind_cod_graficos:number
    cantidad_senales:number;
    listaSenales:SenalesItem[]=[];

    constructor(co,ce,cc,icg,cs:number,dc,ic:string){
        this.cod_org = co;
        this.cod_esp = ce;
        this.cod_cop = cc;
        this.desc_cop = dc;
        this.img_cop = ic;
        this.ind_cod_graficos = icg;
        this.cantidad_senales =cs;
    }

    
}
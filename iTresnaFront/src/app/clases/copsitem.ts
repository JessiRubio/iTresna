import { SenalesItem } from "./senales-item";

export class CopsItem{

    cod_org:number=0;
    cod_esp:number=0;
    cod_cop:number=0;
    desc_cop:string="";
    img_cop:string="";
    ind_cod_graficos:number=0;
    cantidad_senales:number=0;
    listaSenales:SenalesItem[]=[];
    etiquetas:EtiquetaItem[]=[];
    usuario:string[]=[];

    /*
    constructor(co,ce,cc,icg,cs:number,dc,ic:string){
        this.cod_org = co;
        this.cod_esp = ce;
        this.cod_cop = cc;
        this.desc_cop = dc;
        this.img_cop = ic;
        this.ind_cod_graficos = icg;
        this.cantidad_senales =cs;
    }
*/
    
}
export class EtiquetaItem{
    cod_etiqueta:number;
    desc_etiqueta:string;
}
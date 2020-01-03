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
    etiquetas:EtiquetaItem[]=new EtiquetaItem()[0];
    usuarios:string[]=[];
 
}
export class EtiquetaItem{
    cod_etiqueta:number;
    desc_etiqueta:string;
}
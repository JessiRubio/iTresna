export class Organizacion {
    cod_org:number=0;
    desc_org:string="";
    img_org:string="";
    enlace_org:string="";
    eslogan_org:string="";
    clasificacion:Clasificacion[]=[];
    contacto:string="";
    usuarios:string[]=[];
}

export class Clasificacion{
    clasificacion:string;
    categorias:string[]=[];
}
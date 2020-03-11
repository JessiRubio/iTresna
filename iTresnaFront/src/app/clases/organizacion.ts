export class Organizacion {
    cod_org:number=0;
    desc_org:string="";
    img_org:string="";
    enlace_org:string="";
    eslogan_org:string="";
    clasificaciones:Categorias[]=[];
    contacto:string="";
    usuarios:string[]=[];
}

export class Categorias{
    clasificacion:string;
    categoria:string[]=[];
}
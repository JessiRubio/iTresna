export class Organizacion {

cod_org:number=0;
desc_org:string="";
img_org:string="";
enlace_org:string="";
eslogan_org:string="";
clasif1:string="";
clasif2:string="";
clasif3:string="";
categorias:Categorias[]=[];
contacto:string="";
}

export class Categorias{
    tip_clasificacion:string;
    categoria:string;
}
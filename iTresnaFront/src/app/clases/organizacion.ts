export class Organizacion {
    cod_org:number=0;
    desc_org:string="";
    img_org:string="";
    enlace_org:string="";
    eslogan_org:string="";
<<<<<<< HEAD
    clasificacion:Categorias[]=[];
=======
    clasificaciones:Categorias[]=[];
>>>>>>> 48da4fe0a5dee8fa7271782df7eb83552d8e909c
    contacto:string="";
    usuarios:string[]=[];
}

export class Categorias{
    clasificacion:string;
    categoria:string[]=[];
}
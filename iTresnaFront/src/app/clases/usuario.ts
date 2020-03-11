
export class Usuario{
    ape1:string;
    ape2:string;
    cod_org:number;
    cod_usuario:string;
    nombre:string;
    permisos:Permiso[];
    sarbidea:string;
    tip_usuario:number;
    clasificacion:ClasificacionUsuario[]=[];
}
export class Permiso{
    cod_org:number;
    cod_esp:number;
    cod_cop:number;
    ind_admin:boolean;
}
class ClasificacionUsuario{
    tip_clasificacion:string;
    categoria:string;
}
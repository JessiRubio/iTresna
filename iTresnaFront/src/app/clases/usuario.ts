
export class Usuario{
    ape1:string;
    ape2:string;
    cod_org:number;
    cod_usuario:string;
    nombre:string;
    permisos:Permiso[];
    sarbide:string;
    tip_usuario:string;
}
export class Permiso{
    cod_org:number;
    cod_esp:number;
    cod_cop:number;
    ind_admin:boolean;
}
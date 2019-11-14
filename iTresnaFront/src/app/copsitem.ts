export class CopsItem{
    nombre:string;
    numeroSenales:string;
    constructor(n:string,ns:string){
        this.nombre=n;
        this.numeroSenales= ns + " Señales";
    }
}
export interface Docente{
    idDocente:number,
    nome:string,
    cognome:string,
    email?:string,
    password?:string,
    data?:Date,
    indirizzo?:string,
    stipendio?: number,
    hide?:boolean,
    abilitazione:number,
    idUtente:number,
    abilit:string

}

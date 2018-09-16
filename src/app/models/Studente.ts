export interface Studente{
    nome:string,
    cognome:string,
    email?:string,
    password?:string,
    data?:Date,
    indirizzo?:string,
    matricola?: number,
    idcorso?: number,
    hide?:boolean,
    abilitazione:number

}

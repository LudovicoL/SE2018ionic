export interface Studente{
    name:string,
    surname:string,
    email?:string,
    password?:string,
    data?:Date,
    indirizzo?:string,
    matricola?: number,
    idcorso?: number,
    hide?:boolean
}

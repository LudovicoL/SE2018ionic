export interface Docente{
    name:string,
    surname:string,
    email?:string,
    password?:string,
    data?:Date,
    indirizzo?:string,
    stipendio?: number,
    hide?:boolean
}

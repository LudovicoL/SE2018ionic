import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insegnamento } from '../../app/models/Insegnamento';
import { Observable } from '../../../node_modules/rxjs';
import {Lezione} from "../../app/models/Lezione";
const headers = new HttpHeaders ({'Content-Type' : 'application/json'});

/*
  Generated class for the InsegnamentoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InsegnamentoProvider {
  insegnamentosaveUrl: string = 'http://localhost:8080/SE2018/insegnamento/save'
  insegnamentogetUrl:string='http://localhost:8080/SE2018/insegnamento/getAll'
  updateUrl:string='http://localhost:8080/SE2018/insegnamento/update'
  updateabilitazioneUrl:string='http://localhost:8080/SE2018/insegnamento/updateabilitazione'
  insegnamentoByCorsoUrl:string='http://localhost:8080/SE2018/insegnamento/getByIdCorso'
  insegnamentoByDocenteUrl:string='http://localhost:8080/SE2018/insegnamento/getByIdDocente'
  insegnamentoByStudenteUrl:string='http://localhost:8080/SE2018/insegnamento/getByIdStudente'
  constructor(public http: HttpClient) {
    console.log('Hello InsegnamentoProvider Provider');
  }
  saveInsegnamento(insegnamento: Insegnamento): Observable<Insegnamento>{
    return this.http.post<Insegnamento>(this.insegnamentosaveUrl, insegnamento, {headers});
  }
  getInsegnamento(): Observable<Insegnamento[]>{
    return this.http.get<Insegnamento[]>(this.insegnamentogetUrl);
  }
  update(insegnamento:Insegnamento): Observable<Insegnamento>{
    return this.http.patch<Insegnamento>(this.updateUrl, insegnamento, {headers});
  }
  updateabilitazione(insegnamento:Insegnamento): Observable<Insegnamento>{
    return this.http.patch<Insegnamento>(this.updateabilitazioneUrl, insegnamento, {headers});
  }
  insegnamentoByCorso(id:number):Observable<Insegnamento[]>{
    return this.http.get<Insegnamento[]>(this.insegnamentoByCorsoUrl + '/' +id);
  }

  insegnamentoByDocente(id:number):Observable<Insegnamento[]>{
    return this.http.get<Insegnamento[]>(this.insegnamentoByDocenteUrl + '/' +id);
  }
  insegnamentoByStudente(id:number):Observable<Insegnamento[]>{
    return this.http.get<Insegnamento[]>(this.insegnamentoByStudenteUrl + '/' +id);
  }
}

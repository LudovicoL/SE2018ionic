import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insegnamento } from '../../app/models/Insegnamento';
import { Observable } from '../../../node_modules/rxjs';
const headers = new HttpHeaders ({'Content-Type' : 'application/json'});

/*
  Generated class for the InsegnamentoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InsegnamentoProvider {
  insegnamentosaveUrl: string = 'http://localhost:8080/SE2018/insegnamento/save'

  constructor(public http: HttpClient) {
    console.log('Hello InsegnamentoProvider Provider');
  }
  saveInsegnamento(insegnamento: Insegnamento): Observable<Insegnamento>{
    return this.http.post<Insegnamento>(this.insegnamentosaveUrl, insegnamento, {headers});
  }
}

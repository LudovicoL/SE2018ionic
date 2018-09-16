import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Docente } from '../../app/models/Docente';
import { Observable } from '../../../node_modules/rxjs';
const headers = new HttpHeaders ({'Content-Type' : 'application/json'});

/*
  Generated class for the DocenteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DocenteProvider {
  docentesaveUrl: string = 'http://localhost:8080/SE2018/docente/save'
  docentegetUrl:string= 'http://localhost:8080/SE2018/docente/getAll'
  constructor(public http: HttpClient) {
    console.log('Hello DocenteProvider Provider');
  }

  saveDocente(docente: Docente): Observable<Docente>{
    return this.http.post<Docente>(this.docentesaveUrl, docente, {headers});
  }
  getDocente(): Observable<Docente[]>{
    return this.http.get<Docente[]>(this.docentegetUrl);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Studente } from '../../app/models/Studente';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the StudenteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const headers = new HttpHeaders ({'Content-Type' : 'application/json'});

@Injectable()
export class StudenteProvider {
  studentesaveUrl: string = 'http://localhost:8080/SE2018/studente/save'
  studentegetUrl:string='http://localhost:8080/SE2018/studente/getAll'
  studentegetByIdUrl:string='http://localhost:8080/SE2018/studente/getById'
  constructor(public http: HttpClient) {
    console.log('Hello StudenteProvider Provider');
  }
  
  saveStudente(studente: Studente): Observable<Studente>{
    return this.http.post<Studente>(this.studentesaveUrl, studente, {headers});
  }
  
  getStudente(): Observable<Studente[]>{
    return this.http.get<Studente[]>(this.studentegetUrl);
  }

  getStudenteById(id:number): Observable<Studente>{
    return this.http.get<Studente>(this.studentegetByIdUrl + '/' + id);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Corso } from '../../app/models/Corso';

/*
  Generated class for the CorsoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const headers = new HttpHeaders ({'Content-Type' : 'application/json'});

@Injectable()
export class CorsoProvider {
  corsogetUrl: string = 'http://localhost:8080/SE2018/corso/getAll'
  corsosaveUrl: string = 'http://localhost:8080/SE2018/corso/save'
  updateUrl:string= 'http://localhost:8080/SE2018/corso/update'
  constructor(public http: HttpClient) {
    console.log('Hello CorsoProvider Provider');
  }
  
  getCorso(): Observable<Corso[]>{
    return this.http.get<Corso[]>(this.corsogetUrl);
  }

  saveCorso(corso: Corso): Observable<Corso>{
    return this.http.post<Corso>(this.corsosaveUrl, corso, {headers});
  }
  
  update(corso:Corso): Observable<Corso>{
    return this.http.patch<Corso>(this.updateUrl, corso, {headers});
  }
}

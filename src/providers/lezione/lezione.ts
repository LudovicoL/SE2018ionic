import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lezione } from '../../app/models/Lezione';
import { Observable } from 'rxjs';

/*
  Generated class for the LezioneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const headers = new HttpHeaders ({'Content-Type' : 'application/json'});

@Injectable()
export class LezioneProvider {
  lezionesaveUrl:string="http://localhost:8080/SE2018/lezione/save"
  constructor(public http: HttpClient) {
    console.log('Hello LezioneProvider Provider');
  }


  saveLezione(lezione: Lezione): Observable<Lezione>{
    return this.http.post<Lezione>(this.lezionesaveUrl, lezione, {headers});
  }
}

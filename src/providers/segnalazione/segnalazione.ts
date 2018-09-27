import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Segnalazione } from '../../app/models/Segnalazione';
import { Observable } from 'rxjs';

/*
  Generated class for the SegnalazioneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const headers = new HttpHeaders ({'Content-Type' : 'application/json'});

@Injectable()
export class SegnalazioneProvider {
  segnalazionegetUrl:string='http://localhost:8080/SE2018/segnalazione/getAll'
  updateUrl:string='http://localhost:8080/SE2018/segnalazione/update'
  deleteUrl:string='http://localhost:8080/SE2018/segnalazione/delete'


  constructor(public http: HttpClient) {
    console.log('Hello SegnalazioneProvider Provider');
  }

  getSegnalazioni(): Observable<Segnalazione[]>{
    return this.http.get<Segnalazione[]>(this.segnalazionegetUrl);
  } 

  update(segnalazione:Segnalazione): Observable<Segnalazione>{
    return this.http.patch<Segnalazione>(this.updateUrl, segnalazione, {headers});
  }

  delete(idSegnalazione:Response):Observable<Response>{
    return this.http.delete<Response>(this.deleteUrl + '/' + idSegnalazione);
  }
}

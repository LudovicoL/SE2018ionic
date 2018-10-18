import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lezione } from '../../app/models/Lezione';
import { Observable } from 'rxjs';

const headers = new HttpHeaders ({'Content-Type' : 'application/json'});

@Injectable()
export class LezioneProvider {
  lezionesaveUrl:string="http://localhost:8080/SE2018/lezione/save"
  lezionegetByIdUrl:string="http://localhost:8080/SE2018/lezione/getLezioneByIdInsegnamento"
  lezioneesistenteUrl:string="http://localhost:8080/SE2018/lezione/lezioneesistente"
  lezioneDocenteUrl:string="http://localhost:8080/SE2018/lezione/lezionedocente"
  constructor(public http: HttpClient) {
    console.log('Hello LezioneProvider Provider');
  }


  saveLezione(lezione: Lezione): Observable<Lezione>{
    return this.http.post<Lezione>(this.lezionesaveUrl, lezione, {headers});
  }

  getLezioneById(id:number): Observable<Lezione[]>{
    return this.http.get<Lezione[]>(this.lezionegetByIdUrl + '/' + id);
  }

  lezioneesistente(data1:Date,data2:Date,idLezione:number): Observable<Number>{
    return this.http.get<Number>(this.lezioneesistenteUrl + '/' +data1 + '/' +data2 + '/' +idLezione);
  }

  lezioneDocente(data1:Date,data2:Date,idDocente:number):Observable<Lezione[]>{
    return this.http.get<Lezione[]>(this.lezioneDocenteUrl + '/' +data1 + '/' +data2 + '/' + idDocente);

  }
}

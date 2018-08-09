import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { Aula } from '../../app/models/Aula';

/*
  Generated class for the AulaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const headers = new HttpHeaders ({'Content-Type' : 'application/json'});

@Injectable()
export class AulaProvider {
  aulasaveUrl: string = 'http://localhost:8080/SE2018/aula/save'
  getultimaaulaurl:string='http://localhost:8080/SE2018/aula/getultimaaula'

  constructor(public http: HttpClient) {
    console.log('Hello AulaProvider Provider');
  }

  saveAula(aula: Aula): Observable<Aula>{
    return this.http.post<Aula>(this.aulasaveUrl, aula, {headers});
  }

  ultimaAula(): Observable<number>{ 
    return this.http.get<number>(this.getultimaaulaurl);

  }
}

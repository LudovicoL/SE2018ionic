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
  aulagetUrl:string='http://localhost:8080/SE2018/aula/getAll'
  aulagetByIdUrl:string='http://localhost:8080/SE2018/aula/getById'
  updateUrl:string='http://localhost:8080/SE2018/aula/update'
  deleteUrl:string='http://localhost:8080/SE2018/aula/delete'
  aulelibereUrl:string='http://localhost:8080/SE2018/aula/aulelibere'
  aulelibereEsameUrl:string='http://localhost:8080/SE2018/aula/aulelibereEsame'

  constructor(public http: HttpClient) {
    console.log('Hello AulaProvider Provider');
  }

  saveAula(aula: Aula): Observable<Aula>{
    return this.http.post<Aula>(this.aulasaveUrl, aula, {headers});
  }

  ultimaAula(): Observable<number>{ 
    return this.http.get<number>(this.getultimaaulaurl);
  }

  getAula(): Observable<Aula[]>{
    return this.http.get<Aula[]>(this.aulagetUrl);
  }

  getAulaById(id:number): Observable<Aula>{
    return this.http.get<Aula>(this.aulagetByIdUrl + '/' + id);
  }

  update(aula:Aula): Observable<Aula>{
    return this.http.patch<Aula>(this.updateUrl, aula, {headers});
  }

  delete(idAula:Response):Observable<Response>{
    return this.http.delete<Response>(this.deleteUrl + '/' + idAula);
  }

  aulelibere(data1:Date,data2:Date):Observable<Aula[]>{
    return this.http.get<Aula[]>(this.aulelibereUrl + '/' + data1 + '/' + data2);
  }

  aulelibereEsame(data1:Date,data2:Date):Observable<Aula[]>{
    return this.http.get<Aula[]>(this.aulelibereEsameUrl + '/' + data1 + '/' + data2);
  }
}

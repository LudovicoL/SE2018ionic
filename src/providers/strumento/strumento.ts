import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Strumento } from '../../app/models/Strumento';
import { Observable } from '../../../node_modules/rxjs';

/*
  Generated class for the StrumentoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const headers = new HttpHeaders ({'Content-Type' : 'application/json'});

@Injectable()
export class StrumentoProvider {
  strumentosaveUrl: string = 'http://localhost:8080/SE2018/strumento/save'
  strumentogetUrl:string= 'http://localhost:8080/SE2018/strumento/getAll'
  strumentogetByIdAulaUrl:string="http://localhost:8080/SE2018/strumento/getByAulaId"
  updateUrl:string="http://localhost:8080/SE2018/strumento/update"
  constructor(public http: HttpClient) {
    console.log('Hello StrumentoProvider Provider');
  }
  
  saveStrumento(strumento:Strumento): Observable<Strumento>{
    return this.http.post<Strumento>(this.strumentosaveUrl, strumento, {headers});
  }

  getStrumento(): Observable<Strumento[]>{
    return this.http.get<Strumento[]>(this.strumentogetUrl);
  }

  getStrumentoByAula(id:number): Observable<Strumento[]>{
    return this.http.get<Strumento[]>(this.strumentogetByIdAulaUrl + '/' + id);
  }

  update(strumento:Strumento): Observable<Strumento>{
    return this.http.patch<Strumento>(this.updateUrl, strumento, {headers});
  }
}

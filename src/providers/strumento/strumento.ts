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

  constructor(public http: HttpClient) {
    console.log('Hello StrumentoProvider Provider');
  }
  
  saveStrumento(strumento:Strumento): Observable<Strumento>{
    return this.http.post<Strumento>(this.strumentosaveUrl, strumento, {headers});


  }

}

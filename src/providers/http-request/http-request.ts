import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the HttpRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpRequestProvider {
  page: number;
  url: string = "https://rickandmortyapi.com/api/character?page=2";

  constructor(public http: HttpClient) {
    console.log('Hello HttpRequestProvider Provider');
  }

  getCharacters(startIndex): Observable<any>{
    return this.http.get<any>(`${this.url}=${startIndex}`);
  }

}

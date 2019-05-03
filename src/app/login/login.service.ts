import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { getDefaultURL } from '../app.const';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }

  private getHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  public login = (user: string, senha: string): Observable<string> =>{
    const body = JSON.stringify({ login: user, password: senha});

    return this.http.post<string>( getDefaultURL('auth/login'), body, {headers: this.getHeaders(), responseType: 'text' as 'json' } ).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      // return an observable with a user-facing error message
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}

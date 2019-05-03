import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { getDefaultURL } from '../app.const';
import { catchError } from 'rxjs/operators';
import { AuthUtilService } from '../login/auth-util.service';
import { Pessoa } from './pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http:HttpClient, private authUtil: AuthUtilService) { }

  private getHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Authorization': this.authUtil.currentTokenValue,
      'Accept': 'application/json'
    });
  }

  public getPessoas = (): Observable<Pessoa[]> =>{
    
    return this.http.get<Pessoa[]>( getDefaultURL('pessoa'), {headers: this.getHeaders()} ).pipe(catchError(this.handleError));
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

import { Injectable } from '@angular/core';
import { AuthUtilService } from '../login/auth-util.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { getDefaultURL } from '../app.const';
import { catchError } from 'rxjs/operators';
import { Contrato } from './contrato.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

constructor(private http:HttpClient,private authUtil: AuthUtilService) { }
  private getHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.authUtil.currentTokenValue
    });
  }
  public register = (authorized: number,person: number,dateStart:string,dateEnd:string): Observable<string> =>{
    const body = JSON.stringify(
    {
      authorized: {id:authorized},
      person: {id:person},
      dateStart: dateStart,
      dateEnd: dateEnd
    });
    return this.http.post<string>( getDefaultURL('contract'), body, {headers: this.getHeaders(), responseType: 'text' as 'json' } ).pipe(catchError(this.handleError));
  }

  public edit = (id: number,authorized: number,person:number,dateStart:string,dateEnd:string): Observable<string> =>{
    const body = JSON.stringify(
      {
        id: id,
        authorized: {id:authorized},
        person: {id:person},
        dateStart: dateStart,
        dateEnd: dateEnd
      });
    return this.http.put<string>( getDefaultURL('contract'), body, {headers: this.getHeaders(), responseType: 'text' as 'json' } ).pipe(catchError(this.handleError));
  }

  public deleteContratos = (contrato:Contrato): Observable<string> =>{
    return this.http.delete<string>( getDefaultURL('contract/'+contrato.id), {headers: this.getHeaders()} ).pipe(catchError(this.handleError));
  }

  public getContratos = (): Observable<Contrato[]> =>{
    return this.http.get<Contrato[]>( getDefaultURL('contract'), {headers: this.getHeaders()} ).pipe(catchError(this.handleError));
  }
  public getContrato= (contId): Observable<Contrato> =>{
    return this.http.get<Contrato>( getDefaultURL('contract/'+contId), {headers: this.getHeaders()} ).pipe(catchError(this.handleError));
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

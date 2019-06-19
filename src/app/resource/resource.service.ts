import { Injectable } from '@angular/core';
import { AuthUtilService } from '../login/auth-util.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { getDefaultURL } from '../app.const';
import { catchError } from 'rxjs/operators';
import { Resource, Permission } from './resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

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
    return this.http.post<string>( getDefaultURL('resource'), body, {headers: this.getHeaders(), responseType: 'text' as 'json' } ).pipe(catchError(this.handleError));
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
    return this.http.put<string>( getDefaultURL('resource'), body, {headers: this.getHeaders(), responseType: 'text' as 'json' } ).pipe(catchError(this.handleError));
  }

  public deleteResources = (resource:Resource): Observable<string> =>{
    return this.http.delete<string>( getDefaultURL('resource/'+resource.id), {headers: this.getHeaders()} ).pipe(catchError(this.handleError));
  }

  public getResources = (): Observable<Resource[]> =>{
    return this.http.get<Resource[]>( getDefaultURL('resource'), {headers: this.getHeaders()} ).pipe(catchError(this.handleError));
  }
  public getResource= (contId): Observable<Resource> =>{
    return this.http.get<Resource>( getDefaultURL('resource/'+contId), {headers: this.getHeaders()} ).pipe(catchError(this.handleError));
  }
  public getPermissions= (): Observable<Permission[]> =>{
    return this.http.get<Permission[]>( getDefaultURL('permission'), {headers: this.getHeaders()} ).pipe(catchError(this.handleError));
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

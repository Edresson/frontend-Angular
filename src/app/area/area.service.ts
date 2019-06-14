import { Injectable } from '@angular/core';
import { AuthUtilService } from '../login/auth-util.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { getDefaultURL } from '../app.const';
import { catchError } from 'rxjs/operators';
import { Area } from './area.model';

@Injectable()
export class AreaService {

  constructor(private http:HttpClient,private authUtil: AuthUtilService) { }
  private getHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.authUtil.currentTokenValue
    });
  }
  public register = (description: string,geometry: string,soilid: string): Observable<string> =>{
    const body = JSON.stringify({description:description,
    geometry: geometry,
    soil: {
    id: Number(soilid) 
    }});
    return this.http.post<string>( getDefaultURL('area'), body, {headers: this.getHeaders(), responseType: 'text' as 'json' } ).pipe(catchError(this.handleError));
  }

  public edit = (id:number,description: string,geometry: string,soilid: string): Observable<string> =>{
    const body = JSON.stringify({id:id,description:description,
    geometry: geometry, 
    soil: {
      id: Number(soilid) 
      }});
    return this.http.put<string>( getDefaultURL('area'), body, {headers: this.getHeaders(), responseType: 'text' as 'json' } ).pipe(catchError(this.handleError));
  }

  public deleteAreas = (area:Area): Observable<string> =>{
    return this.http.delete<string>( getDefaultURL('area/'+area.id), {headers: this.getHeaders()} ).pipe(catchError(this.handleError));
  }

  public getAreas = (): Observable<Area[]> =>{
    return this.http.get<Area[]>( getDefaultURL('area/all'), {headers: this.getHeaders()} ).pipe(catchError(this.handleError));
  }

  public getArea = (areaId): Observable<Area> =>{
    return this.http.get<Area>( getDefaultURL('area/'+areaId), {headers: this.getHeaders()} ).pipe(catchError(this.handleError));
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


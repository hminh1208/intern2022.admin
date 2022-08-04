import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender, GenderResponseDto } from '@core/models/gender.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GenderService {

    private url = environment.apiUrl;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
        withCredentials: true
    };

    constructor(private http: HttpClient) {}

    public getGender(currentPage: number, pageSize: number): Observable<GenderResponseDto> {
        var params = new HttpParams().set('page', currentPage).set('pageSize', pageSize);

        return this.http.get<GenderResponseDto>(this.url + '/GendermanagementControllers/get', {params: params}).pipe(
            tap((_) => console.log('fetched Genders')),
            catchError(this.handleError<GenderResponseDto>('getGenders')),
        );
    }

    public add(Gender: Gender): Observable<Gender> {
        return this.http
            .post<Gender>(this.url + '/GendermanagementControllers/add', Gender, this.httpOptions)
            .pipe(
                tap((newGender: Gender) => console.log(`added Gender: ` + newGender)),
                catchError(this.handleError<Gender>('addGender')),
            );
    }

    public update(Gender: Gender): Observable<Gender> {
        return this.http
            .put<Gender>(`${this.url}/GendermanagementControllers/${Gender.id}`, Gender, this.httpOptions)
            .pipe(
                tap((newGender: Gender) => console.log(`saved Gender: ` + newGender)),
                catchError(this.handleError<Gender>('saveGender')),
            );
    }

    public deleteGender(id: string): Observable<Gender> {

        const url = `${this.url}/GendermanagementControllers/${id}`;

        console.log(this.httpOptions);

        return this.http.delete<Gender>(url, this.httpOptions).pipe(
            tap((_) => console.log(`deleted Gender id=${id}`)),
            catchError(this.handleError<Gender>('deleteGender')),
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // Gender: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Gender: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gendermanagerment, GenderResponseDto } from '@core/models/gender.model';
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

    getGender(currentPage: number, pageSize: number): Observable<GenderResponseDto> {
        const params = new HttpParams().set('page', currentPage).set('pageSize', pageSize);

        return this.http.get<GenderResponseDto>(this.url +'/GendermanagementControllers/get' , {params: params}).pipe(
            tap((_) => console.log('fetched Genders')),
            catchError(this.handleError<GenderResponseDto>('getGenders')),
        );
    }

    add(Gendermanagerment: Gendermanagerment): Observable<Gendermanagerment> {
        return this.http
            .post<Gendermanagerment>(this.url + '/GendermanagementControllers/add', Gendermanagerment, this.httpOptions)
            .pipe(
                tap((newGendermanagerment: Gendermanagerment) => console.log(`added Gender`)),
                catchError(this.handleError<Gendermanagerment>('addGender')),
            );
    }

    update(Gendermanagerment: Gendermanagerment): Observable<Gendermanagerment> {
        return this.http
            .put<Gendermanagerment>(`${this.url}/GendermanagementControllers/${Gendermanagerment.id}`, Gendermanagerment, this.httpOptions)
            .pipe(
                tap((newGendermanagerment: Gendermanagerment) => console.log(`added Gender`)),
                catchError(this.handleError<Gendermanagerment>('addGender')),
            );
    }

    deleteGender(id: string): Observable<Gendermanagerment> {
        const url = `${this.url}/GendermanagementControllers/${id}`;

        console.log(this.httpOptions);

        return this.http.delete<Gendermanagerment>(url, this.httpOptions).pipe(
            tap((_) => console.log(`deleted Gender id=${id}`)),
            catchError(this.handleError<Gendermanagerment>('deleteGender')),
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // City: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // City: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}

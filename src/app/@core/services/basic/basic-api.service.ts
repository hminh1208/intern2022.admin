import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '@core/models/city.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CityService {

    //private url = 'https://crud-City-demo.herokuapp.com/api/'; // URL to web api
    private url = environment.apiUrl;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {}

    getCity(): Observable<City[]> {
        return this.http.get<City[]>(this.url + '/cities').pipe(
            tap((_) => console.log('fetched Citys')),
            catchError(this.handleError<City[]>('getCitys', [])),
        );
    }

    addCity(City: City): Observable<City> {
        return this.http
            .post<City>(this.url + '/cities', City, this.httpOptions)
            .pipe(
                tap((newCity: City) => console.log(`added City}`)),
                catchError(this.handleError<City>('addCity')),
            );
    }

    deleteCity(id: string): Observable<City> {
        const url = `${this.url}/cities/${id}`;

        return this.http.delete<City>(url, this.httpOptions).pipe(
            tap((_) => console.log(`deleted City id=${id}`)),
            catchError(this.handleError<City>('deleteCity')),
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

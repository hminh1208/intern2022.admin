import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City, CityResponseDto } from '@core/models/city.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CityService {
    private url = environment.apiUrl;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true,
    };

    constructor(private http: HttpClient) {}

    getCity(
        currentPage: number,
        pageSize: number,
    ): Observable<CityResponseDto> {
        const params = new HttpParams()
            .set('page', currentPage)
            .set('pageSize', pageSize);

        return this.http
            .get<CityResponseDto>(this.url + '/CategoryCities', {
                params: params,
            })
            .pipe(
                tap((_) => console.log('fetched Citys')),
                catchError(this.handleError<CityResponseDto>('getCitys')),
            );
    }

    add(City: City): Observable<City> {
        return this.http
            .post<City>(
                this.url + '/CategoryCities/Add-new',
                City,
                this.httpOptions,
            )
            .pipe(
                tap((newCity: City) => console.log(`added City`)),
                catchError(this.handleError<City>('addCity')),
            );
    }

    update(City: City): Observable<City> {
        return this.http
            .post<City>(
                `${this.url}/CategoryCities/Edit/${City.id}`,
                City,
                this.httpOptions,
            )
            .pipe(
                tap((newCity: City) => console.log(`Update City`)),
                catchError(this.handleError<City>('updateCity')),
            );
    }

    deleteCity(id: string): Observable<City> {
        const url = `${this.url}/CategoryCities/Remove/${id}`;

        console.log(this.httpOptions);

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

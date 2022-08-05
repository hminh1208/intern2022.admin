import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language, LanguageResponseDto } from '@core/models/language.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LanguageService {

    private url = environment.apiUrl;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
        withCredentials: true
    };

    constructor(private http: HttpClient) {}

    getLanguage(currentPage: number, pageSize: number): Observable<LanguageResponseDto> {
        const params = new HttpParams().set('page', currentPage).set('pageSize', pageSize);

        return this.http.get<LanguageResponseDto>(this.url + '/LanguageControllers/get', {params: params}).pipe(
            tap((_) => console.log('fetched Languages')),
            catchError(this.handleError<LanguageResponseDto>('getLanguages')),
        );
    }

    add(Language: Language): Observable<Language> {
        return this.http
            .post<Language>(this.url + '/LanguageControllers/add', Language, this.httpOptions)
            .pipe(
                tap((newLanguage: Language) => console.log(`added Language`)),
                catchError(this.handleError<Language>('addLanguage')),
            );
    }

    update(Language: Language): Observable<Language> {
        return this.http
            .post<Language>(`${this.url}/LanguageControllers/${Language.id}`, Language, this.httpOptions)
            .pipe(
                tap((newLanguage: Language) => console.log(`Update Language`)),
                catchError(this.handleError<Language>('updateLanguage')),
            );
    }

    deleteLanguage(id: string): Observable<Language> {
        const url = `${this.url}/LanguageControllers/${id}`;
        console.log(this.httpOptions);

        return this.http.delete<Language>(url, this.httpOptions).pipe(
            tap((_) => console.log(`deleted Language id=${id}`)),
            catchError(this.handleError<Language>('deleteLanguage')),
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // Language: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Language: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}

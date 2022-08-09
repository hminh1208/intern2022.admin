import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    AccountAuthRequestDto,
    AccountAuthResponseDto
} from '@core/models/auth.model';
import { getItem, removeItem, setItem, StorageItem } from '@core/utils';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));

    private url = environment.apiUrl;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true
    };

    constructor(private http: HttpClient) {}

    get isLoggedIn(): boolean {
        return this.isLoggedIn$.getValue();
    }

    signIn(
        requestBody: AccountAuthRequestDto,
    ): Observable<AccountAuthResponseDto> {
        return this.http
            .post<AccountAuthResponseDto>(
                `${this.url}/accounts/authenticate`,
                requestBody,
                this.httpOptions,
            )
            .pipe(
                tap((auth: AccountAuthResponseDto) => {
                    setItem(StorageItem.Auth, auth);
                    setItem(StorageItem.AccessToken, auth.jwtToken);
                    this.isLoggedIn$.next(true);
                }),
                catchError(this.handleError<AccountAuthResponseDto>('signIn')),
            );
    }

    signInWithRefreshToken() {
        return this.http
            .post<AccountAuthResponseDto>(
                `${this.url}/accounts/authenticate`,
                this.httpOptions,
            )
            .pipe(
                tap((auth: AccountAuthResponseDto) => {
                    setItem(StorageItem.Auth, auth);
                    setItem(StorageItem.AccessToken, auth.jwtToken);
                    this.isLoggedIn$.next(true);
                }),
                catchError(this.handleError<AccountAuthResponseDto>('signIn')),
            );
    }

    signOut(): void {
        removeItem(StorageItem.Auth);
        removeItem(StorageItem.AccessToken);
        this.isLoggedIn$.next(false);
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

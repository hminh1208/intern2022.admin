import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Todo } from '../../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
    private url = 'https://crud-todo-demo.herokuapp.com/api/'; // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {}

    getTodoItem(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.url + 'todo').pipe(
            tap((_) => console.log('fetched items')),
            catchError(this.handleError<Todo[]>('getItems', [])),
        );
    }

    addItem(todo: Todo): Observable<Todo> {
        return this.http
            .post<Todo>(this.url + 'todo', todo, this.httpOptions)
            .pipe(
                tap((newItem: Todo) => console.log(`added item}`)),
                catchError(this.handleError<Todo>('additem')),
            );
    }

    deleteItem(id: string): Observable<Todo> {
        const url = `${this.url}todo/${id}`;

        return this.http.delete<Todo>(url, this.httpOptions).pipe(
            tap((_) => console.log(`deleted item id=${id}`)),
            catchError(this.handleError<Todo>('deleteItem')),
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}

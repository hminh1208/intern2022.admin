import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { getItem, StorageItem } from '@core/utils';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { environment } from '@env/environment';
import { AuthService } from '@pages/auth/services/auth.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authService: AuthService,
        private injector: Injector,
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if ([401, 403].includes(error.status)) {
                    this.router.navigateByUrl(
                        ROUTER_UTILS.config.auth.root +
                            '/' +
                            ROUTER_UTILS.config.auth.signIn,
                    );

                    return this.injector
                        .get(HttpClient)
                        .post(environment.apiUrl + `accounts/refresh-token`, {
                            RefreshToken: getItem(StorageItem.RefreshToken),
                        })
                        .pipe((res) => {
                            return next.handle(request);
                        });
                } else if (error.status === 500) {
                    console.error(error);
                    return throwError(error);
                } else {
                    return throwError(error);
                }
            }),
        );
    }
}

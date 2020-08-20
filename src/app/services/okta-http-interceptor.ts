import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SystemValuesService } from './systemValues.service';
import { AuthService } from './auth.service';

@Injectable()
export class OktaHttpInterceptor implements HttpInterceptor{
    constructor( private systemService: SystemValuesService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.systemService.getToken();
        const reqWithAuth =  req.clone({
            setHeaders :{
                Authorization : `Bearer ${token}`
            }
        });

        return next.handle(reqWithAuth).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                console.log(err)
                 this.systemService.logout();
                 location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
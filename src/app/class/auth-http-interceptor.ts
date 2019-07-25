import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { Injectable } from '@angular/core';
import { LoginUserService } from './login-user.service';
import { tap, catchError } from 'rxjs/operators';
import { HTTPStatus } from './httpstatus';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
	public liUsrSrv: LoginUserService;

	constructor(liUsrSrv: LoginUserService) {
		this.liUsrSrv = liUsrSrv;
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const tok = this.liUsrSrv.authenticationToken;
		
		let creq: HttpRequest<any>
		if (tok) {
			// Only set the header if there's a logged in user token.
			creq = req.clone({
				setHeaders: {
					'Authorization': `Token ${tok}`
				}
			});
		} else {
			// Keep the request as-is if the user is not logged in.
			creq = req;
		}

		// TODO: If an element was set as a spinner element

		return next.handle(creq) // TODO: Should supress HTTPStatus error, but keep real HTTP error.
	}    
}

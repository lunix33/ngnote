import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { Injectable } from '@angular/core';
import { LoginUserService } from '../services/login-user.service';
import { catchError } from 'rxjs/operators';
import { HTTPStatus, HttpStatusCode } from './httpstatus';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ErrorDisplayService } from '../services/error-display.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
	private liUsrSrv: LoginUserService;
	private router: Router;
	private errDispSrv: ErrorDisplayService;

	constructor(liUsrSrv: LoginUserService, errDispSrv: ErrorDisplayService, router: Router) {
		this.liUsrSrv = liUsrSrv;
		this.router = router
		this.errDispSrv = errDispSrv;
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

		return next.handle(creq).pipe(
			catchError((err: HttpErrorResponse) => {
				if (err.status == 0)
					return throwError(new HTTPError(HTTPErrorType.CORS, err))
				else if (err.status === 500)
					return this.navigateSww(err.error.Error)
				else if (err instanceof Error) {
					return this.navigateSww(err);
				}
				return throwError(new HTTPError(HTTPErrorType.NON_OK, err.error))
			})
		)
	}

	navigateSww(err: HTTPStatus|Error) {
		this.errDispSrv.SomethingWentWrong(err)
		return throwError(err);
	}
}

export class HTTPError {
	public type: HTTPErrorType
	public error: HTTPStatus|HttpErrorResponse
	constructor(type: HTTPErrorType, error: HTTPStatus|HttpErrorResponse) {
		this.type = type
		this.error = error
	}
}

export enum HTTPErrorType {
	NON_OK = "nook",
	CORS = "cors",
	ERROR = "err"
}

import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../classes/common';
import { HTTPStatus } from '../classes/httpstatus';
import { ErrorDisplayService } from './error-display.service';

export interface LoginPostData {
	Username: string,
	Password: string
}

@Injectable({
	providedIn: 'root'
})
export class LoginUserService {
	public http: HttpClient;
	public errDispSrv: ErrorDisplayService;

	private usr: User;

	constructor(http: HttpClient, errDispSrv: ErrorDisplayService) {
		this.http = http;
		this.errDispSrv = errDispSrv
	}

	/** Get the logged in user's details. */
	public get get(): User { return this.usr }
	/** Get the user's authentication token. */
	public get authenticationToken(): string { return localStorage.getItem('tok'); }

	/**
	 * Use the credentials to login the user.
	 * @param creds The user crentials
	 */
	async login(creds: LoginPostData): Promise<void> {
		
	}

	async loginFromToken() {
		// TODO: Make a call to GET `/user` to get the current user.
	}

	async logout() {
		try {
			const rst = await (this.http.get(`${ApiUrl}/logout`).toPromise()) as HTTPStatus
		} catch (err) {
			// this.errDispSrv.SomethingWentWrong(err);
			// TODO: Ignore the error in the moment, I'll check how to handle that later...
		}

		// Remove the authentication token.
		localStorage.removeItem("tok");
		this.usr = undefined;
	}
}

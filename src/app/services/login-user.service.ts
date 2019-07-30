import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../classes/common';
import { HTTPStatus, HttpStatusCode } from '../classes/httpstatus';
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
	async login(creds: LoginPostData): Promise<boolean> {
		try {
			const rsp = await (this.http.post(`${ApiUrl}/login`, creds).toPromise()) as HTTPStatus
			if (rsp.Status == HttpStatusCode.Ok) {
				// Set the connected user.
				this.usr = new User(rsp.Message.User);

				// Add to the local storage the user token.
				const t: any = rsp.Message.Token;
				const tok = btoa(`${t.UserID}:${t.Token}`);
				localStorage.setItem('tok', tok);

				return true;
			}
			
		} catch (err) { /* No-op */}

		return false;
	}

	async loginFromToken(): Promise<boolean> {
		try {
			// TODO: Make a call to GET `/user` to get the current user.
		} catch(err) { /* No-op */ }
		return false;
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
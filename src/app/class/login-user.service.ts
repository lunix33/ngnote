import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { ApiUrl, HTTPErrorHandler } from './common';
import { HTTPStatus } from './httpstatus';

export interface LoginPostData {
	Username: string,
	Password: string
}

@Injectable({
	providedIn: 'root'
})
export class LoginUserService {
	public http: HttpClient;

	private usr: User;

	constructor(http: HttpClient) {
		this.http = http;
	}

	/** Get the logged in user's details. */
	public get(): User { return this.usr }
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
			HTTPErrorHandler(err);
		}

		// Remove the authentication token.
		localStorage.removeItem("tok");
		this.usr = undefined;
	}
}

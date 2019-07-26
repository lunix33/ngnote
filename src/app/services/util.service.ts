import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../classes/common';
import { HTTPStatus } from '../classes/httpstatus';

@Injectable({
	providedIn: 'root'
})
export class UtilService {
	private http: HttpClient;

	constructor(http: HttpClient) {
		this.http = http;
	}

	public async AppInfo(): Promise<AppInfoRsp> {
		const rsp = (await this.http.get(`${ApiUrl}/util/info`).toPromise()) as HTTPStatus
		const infos = rsp.Message as AppInfoRsp

		return infos
	}
}

export interface AppInfoRsp {
	CustomStyle?: string,
	Title?: string
}

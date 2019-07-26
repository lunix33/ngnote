import { Component } from '@angular/core';
import { UtilService, AppInfoRsp } from './services/util.service';
import { HTTPErrorType } from './classes/auth-http-interceptor';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public title: string = "ngNote"

	constructor(utilSrv: UtilService) {
		utilSrv.AppInfo()
			.then((i: AppInfoRsp) => {
				this.title = (i.Title) ? i.Title : this.title
			})
			.catch(err => {
				if (err.type == HTTPErrorType.NON_OK)
					console.error('unable to get application information', err.error)
			})
	}
}

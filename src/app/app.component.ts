import { Component, OnInit } from '@angular/core';
import { UtilService, AppInfoRsp } from './services/util.service';
import { HTTPErrorType } from './classes/app-http-interceptor';
import { LoginUserService, LoginPostData } from './services/login-user.service';
import { ModalService } from './services/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { body as loginBody, alert as loginAlert } from './modals/login-modal-content'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	private liUsrSrv: LoginUserService;
	private modalSrv: ModalService;

	public title: string = "ngNote"

	constructor(utilSrv: UtilService, liUsrSrv: LoginUserService, modalSrv: ModalService) {
		this.liUsrSrv = liUsrSrv;
		this.modalSrv = modalSrv;

		utilSrv.AppInfo()
			.then((i: AppInfoRsp) => {
				// Set application title.
				this.title = (i.Title) ? i.Title : this.title
				document.querySelector("title").innerText = i.Title;

				// Set application custom style.
				if (i.CustomStyle) {
					const link = document.createElement('link');
					link.rel = "stylesheet";
					link.type = "text/css";
					link.href = i.CustomStyle;
					document.head.appendChild(link);
				}
			})
			.catch(err => {
				if (err.type == HTTPErrorType.NON_OK)
					console.error('unable to get application information', err.error)
			})
	}

	ngOnInit() {
		this.liUsrSrv.loginFromToken();
	}

	async doLogin() {
		// Display login modal.

		await this.modalSrv.show({
			header: {
				title: "Login"
			},
			
			body: loginBody,

			footer: [
				{
					text: "Login",
					fn: async (ref: BsModalRef) => {
						// Get the credentials from the form.
						const creds: LoginPostData = {
							Username: document.querySelector<HTMLInputElement>('#username').value,
							Password: document.querySelector<HTMLInputElement>('#password').value
						}
						
						// If the user was successfully loggedin, then, just close the modal.
						if (await this.liUsrSrv.login(creds)) {
							ref.hide()
						}
						
						// Otherwise display an error alert only if there isn't already one.
						else {
							const modalBody = document.querySelector('.modal-body');
							const alert = modalBody.querySelector('.alert');
							if (!alert) {
								const doc: HTMLDivElement = document.createElement('div');
								doc.innerHTML = loginAlert
								modalBody.prepend(doc);
							}
						}
					}
				}
			]
		});
	}
}

import { Component, OnInit, Input } from '@angular/core';
import { HTTPError } from 'src/app/classes/auth-http-interceptor';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-sww',
	templateUrl: './sww.component.html',
	styleUrls: ['./sww.component.scss']
})
export class SwwComponent implements OnInit {

	@Input()
	public error: Error|HTTPError = new Error('not really an error...')
	public debug: boolean = localStorage.getItem("debug") === "true"

	constructor(dataSrv: DataService) {
		if (history.state.dataid) {
			const err = dataSrv.get(history.state.dataid);
			this.error = err;
		}
	}

	ngOnInit() {
	}

}

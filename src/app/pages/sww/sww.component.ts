import { Component } from '@angular/core';
import { DisplayError, ErrorDisplayService } from 'src/app/services/error-display.service';

@Component({
	selector: 'app-sww',
	templateUrl: './sww.component.html',
	styleUrls: ['./sww.component.scss']
})
export class SwwComponent {
	public error: DisplayError;
	public debug: boolean = localStorage.getItem("debug") === "true";
	public report: string;

	constructor(errDispSrv: ErrorDisplayService) {
		this.error = history.state.err || errDispSrv.MakeDisplayError({});
		this.report = errDispSrv.Report(this.error)
	}
}

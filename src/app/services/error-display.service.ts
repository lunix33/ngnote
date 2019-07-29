import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class ErrorDisplayService {
	private router: Router;

	private reportURL: string = 'https://github.com/lunix33/gonote/issues/new';

	constructor(router: Router) {
		this.router = router;
	}

	/**
	 * Transform an error into a DisplayError to be used by the Error Display service.
	 * @param error An error (or similar) to be transformed into a DisplayError.
	 * @param friendly An optional friendly message to be displayed.
	 */
	public MakeDisplayError(error: any, friendly?: string): DisplayError {
		if (error == null) error = {};
		return {
			friendly: friendly || error.friendly || 'An error occured while trying to display the page.',
			message: error.message || 'No message available.',
			stack: error.stack || 'No stack available.',
			where: error.where || location.href,
			when: error.when || new Date()
		};
	}

	/**
	 * Redirect the user to the Something Went Wrong page with the specified error.
	 * @param err The error occurred.
	 */
	public SomethingWentWrong(err: any) {
		const derr = this.MakeDisplayError(err);

		this.router.navigate(['/sww'], {
			state: {
				err: derr
			}
		});
	}

	/**
	 * Generate a link to report the error.
	 * @param err The error which needs to be reported.
	 * @returns A string with the full report URL.
	 */
	public Report(err: DisplayError): string {
		const title = encodeURIComponent(`SWW: ${err.message||err.friendly}`);
		const body = encodeURIComponent(
			`Describe what happened here...

--- --- ---
When: ${err.when.toISOString()}
Where: ${err.where}
What: ${err.message || err.friendly || 'No message was found.'}
How:
${err.stack || "stack not available"}`);

		return `${this.reportURL}?title=${title}&body=${body}`;
	}
}

/**
 * An object used by the ErrorDisplay service to display relevent information about an error.
 */
export interface DisplayError {
	where: string
	when: Date,
	friendly?: string,
	message?: string,
	stack?: string,
}

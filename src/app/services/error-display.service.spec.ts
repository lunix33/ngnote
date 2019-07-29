import { TestBed } from '@angular/core/testing';
import { ErrorDisplayService, DisplayError } from './error-display.service';
import { SwwComponent } from '../pages/sww/sww.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from '../components/card/card.component';
import { HTTPStatusResponseError } from '../classes/httpstatus';

const routes = [
	{ path: 'sww', component: SwwComponent }
]

describe('ErrorDisplayService', () => {
	let errDispSrv: ErrorDisplayService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ SwwComponent, CardComponent ],
			imports: [ RouterTestingModule.withRoutes(routes) ],
		});
		errDispSrv = TestBed.get(ErrorDisplayService)
	});

	it('makes a display error from Error object', () => {
		const err = new Error("This is a random error");
		const ferr = "This is friendly."
		const disp = errDispSrv.MakeDisplayError(err, ferr);

		expect(disp.friendly).toBe(ferr);
		expect(disp.message).toBe(err.message);
		expect(disp.stack).toBe(err.stack);
		expect(disp.where).toBe(location.href);
		expect(disp.when instanceof Date).toBeTruthy();
	});

	it('makes a display error from nothing', () => {
		const disp = errDispSrv.MakeDisplayError(null)

		expect(disp.friendly).toBe('An error occured while trying to display the page.');
		expect(disp.message).toBe('No message available.');
		expect(disp.stack).toBe('No stack available.');
		expect(disp.where).toBe(location.href);
		expect(disp.when instanceof Date).toBeTruthy();
	});

	it('makes a display error from a HTTPStatus', () => {
		const status: HTTPStatusResponseError = {
			friendly: "Random Friendly"
		}

		const disp = errDispSrv.MakeDisplayError(status);

		expect(disp.friendly).toBe(status.friendly)
		expect(disp.message).toBe('No message available.');
		expect(disp.stack).toBe('No stack available.');
		expect(disp.where).toBe(location.href);
		expect(disp.when instanceof Date).toBeTruthy();
	});

	it ('make a display error from another display error', () => {
		const derr: DisplayError = {
			friendly: "Friendly",
			message: "Message",
			stack: "Stack",
			when: new Date(),
			where: "Someplace"
		};
		const disp = errDispSrv.MakeDisplayError(derr);

		expect(disp.friendly).toBe(derr.friendly)
		expect(disp.message).toBe(derr.message);
		expect(disp.stack).toBe(derr.stack);
		expect(disp.where).toBe(derr.where);
		expect(disp.when instanceof Date).toBeTruthy();
		expect(disp.when).toBe(derr.when);
	});
});

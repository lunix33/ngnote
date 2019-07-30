import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SwwComponent } from '../pages/sww/sww.component';
import { CardComponent } from '../components/card/card.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './app-http-interceptor';

const routes = [
	{ path: 'sww', component: SwwComponent }
]

describe('AuthHttpInterceptor', () => {
	let httpMock: HttpTestingController;
	

	beforeEach(() => { 
		TestBed.configureTestingModule({
			declarations: [ SwwComponent, CardComponent ],
			imports: [ RouterTestingModule.withRoutes(routes), HttpClientTestingModule ],
			providers: [
				{ provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
			]
		});
	});

	it('should create an instance', () => {
		// TODO: Figure out how to test the injector.
		// expect(interceptor).toBeTruthy();
	});
});

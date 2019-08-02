import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { LoginUserService } from './login-user.service';

describe('UserServiceService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ]
		});
	});

	// TODO: There's no tests...
});

import { TestBed } from '@angular/core/testing';

import { LoginUserService } from './login-user.service';

describe('UserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginUserService = TestBed.get(LoginUserService);
    expect(service).toBeTruthy();
  });
});

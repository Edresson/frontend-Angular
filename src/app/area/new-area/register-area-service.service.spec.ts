import { TestBed } from '@angular/core/testing';

import { RegisterAreaServiceService } from './register-area-service.service';

describe('RegisterAreaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterAreaServiceService = TestBed.get(RegisterAreaServiceService);
    expect(service).toBeTruthy();
  });
});

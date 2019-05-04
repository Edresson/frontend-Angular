import { TestBed } from '@angular/core/testing';

import { NewAreaService } from './new-area.service';

describe('NewAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewAreaService = TestBed.get(NewAreaService);
    expect(service).toBeTruthy();
  });
});

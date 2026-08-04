import { TestBed } from '@angular/core/testing';

import { EnrollmentHub } from './enrollment-hub';

describe('EnrollmentHub', () => {
  let service: EnrollmentHub;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentHub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

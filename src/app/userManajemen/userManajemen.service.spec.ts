import { TestBed } from '@angular/core/testing';

import { UserManajemenService } from './userManajemen.service';

describe('UserManajemenService', () => {
  let service: UserManajemenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManajemenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

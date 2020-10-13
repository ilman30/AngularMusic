import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManajemenComponent } from './userManajemen.component';

describe('UserManajemenComponent', () => {
  let component: UserManajemenComponent;
  let fixture: ComponentFixture<UserManajemenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManajemenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManajemenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

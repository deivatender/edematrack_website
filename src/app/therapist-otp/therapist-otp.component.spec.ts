import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistOtpComponent } from './therapist-otp.component';

describe('TherapistOtpComponent', () => {
  let component: TherapistOtpComponent;
  let fixture: ComponentFixture<TherapistOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TherapistOtpComponent]
    });
    fixture = TestBed.createComponent(TherapistOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

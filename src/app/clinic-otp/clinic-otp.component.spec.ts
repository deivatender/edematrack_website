import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicOtpComponent } from './clinic-otp.component';

describe('ClinicOtpComponent', () => {
  let component: ClinicOtpComponent;
  let fixture: ComponentFixture<ClinicOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClinicOtpComponent]
    });
    fixture = TestBed.createComponent(ClinicOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

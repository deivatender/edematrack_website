import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverpassComponent } from './recoverpass.component';

describe('RecoverpassComponent', () => {
  let component: RecoverpassComponent;
  let fixture: ComponentFixture<RecoverpassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverpassComponent]
    });
    fixture = TestBed.createComponent(RecoverpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

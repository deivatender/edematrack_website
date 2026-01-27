import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepassComponent } from './createpass.component';

describe('CreatepassComponent', () => {
  let component: CreatepassComponent;
  let fixture: ComponentFixture<CreatepassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatepassComponent]
    });
    fixture = TestBed.createComponent(CreatepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

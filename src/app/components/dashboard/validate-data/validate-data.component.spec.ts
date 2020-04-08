import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateDataComponent } from './validate-data.component';

describe('ValidateDataComponent', () => {
  let component: ValidateDataComponent;
  let fixture: ComponentFixture<ValidateDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlookInitComponent } from './outlook-init.component';

describe('OutlookInitComponent', () => {
  let component: OutlookInitComponent;
  let fixture: ComponentFixture<OutlookInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutlookInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlookInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

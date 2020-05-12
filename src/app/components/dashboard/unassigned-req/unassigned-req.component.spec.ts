import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedReqComponent } from './unassigned-req.component';

describe('UnassignedReqComponent', () => {
  let component: UnassignedReqComponent;
  let fixture: ComponentFixture<UnassignedReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignedReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

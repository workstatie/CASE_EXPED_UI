import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionByReqComponent } from './solution-by-req.component';

describe('SolutionByReqComponent', () => {
  let component: SolutionByReqComponent;
  let fixture: ComponentFixture<SolutionByReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionByReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionByReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

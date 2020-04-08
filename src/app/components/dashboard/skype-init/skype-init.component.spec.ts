import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkypeInitComponent } from './skype-init.component';

describe('SkypeInitComponent', () => {
  let component: SkypeInitComponent;
  let fixture: ComponentFixture<SkypeInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkypeInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkypeInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackInitComponent } from './slack-init.component';

describe('SlackInitComponent', () => {
  let component: SlackInitComponent;
  let fixture: ComponentFixture<SlackInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlackInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlackInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

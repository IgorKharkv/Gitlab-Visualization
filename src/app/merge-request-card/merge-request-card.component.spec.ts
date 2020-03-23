import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeRequestCardComponent } from './merge-request-card.component';

describe('MergeRequestCardComponent', () => {
  let component: MergeRequestCardComponent;
  let fixture: ComponentFixture<MergeRequestCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeRequestCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

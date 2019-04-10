import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReviewDialogComponent } from './new-review-dialog.component';

describe('NewReviewDialogComponent', () => {
  let component: NewReviewDialogComponent;
  let fixture: ComponentFixture<NewReviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

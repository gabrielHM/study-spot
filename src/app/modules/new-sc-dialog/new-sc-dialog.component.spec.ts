import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScDialogComponent } from './new-sc-dialog.component';

describe('NewScDialogComponent', () => {
  let component: NewScDialogComponent;
  let fixture: ComponentFixture<NewScDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewScDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

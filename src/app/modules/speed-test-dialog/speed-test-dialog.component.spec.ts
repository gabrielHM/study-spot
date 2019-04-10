import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedTestDialogComponent } from './speed-test-dialog.component';

describe('SpeedTestDialogComponent', () => {
  let component: SpeedTestDialogComponent;
  let fixture: ComponentFixture<SpeedTestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedTestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

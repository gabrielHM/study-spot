import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCenterOverviewComponent } from './study-center-overview.component';

describe('StudyCenterOverviewComponent', () => {
  let component: StudyCenterOverviewComponent;
  let fixture: ComponentFixture<StudyCenterOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyCenterOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCenterOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

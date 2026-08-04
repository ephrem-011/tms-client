import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructureDashboardComponent } from './instructor-dashboard.component';

describe('InstructureDashboardComponent', () => {
  let component: InstructureDashboardComponent;
  let fixture: ComponentFixture<InstructureDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructureDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructureDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

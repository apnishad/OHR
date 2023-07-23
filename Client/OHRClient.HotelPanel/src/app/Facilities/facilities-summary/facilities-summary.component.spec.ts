import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesSummaryComponent } from './facilities-summary.component';

describe('FacilitiesSummaryComponent', () => {
  let component: FacilitiesSummaryComponent;
  let fixture: ComponentFixture<FacilitiesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitiesSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitiesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

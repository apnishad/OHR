import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelLocationSummaryComponent } from './hotel-location-summary.component';

describe('HotelLocationSummaryComponent', () => {
  let component: HotelLocationSummaryComponent;
  let fixture: ComponentFixture<HotelLocationSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelLocationSummaryComponent]
    });
    fixture = TestBed.createComponent(HotelLocationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

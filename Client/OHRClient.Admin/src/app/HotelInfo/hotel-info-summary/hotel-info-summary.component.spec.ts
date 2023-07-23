import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelInfoSummaryComponent } from './hotel-info-summary.component';

describe('HotelInfoSummaryComponent', () => {
  let component: HotelInfoSummaryComponent;
  let fixture: ComponentFixture<HotelInfoSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelInfoSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelInfoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

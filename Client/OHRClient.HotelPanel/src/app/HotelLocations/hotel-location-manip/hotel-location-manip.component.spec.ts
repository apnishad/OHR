import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelLocationManipComponent } from './hotel-location-manip.component';

describe('HotelLocationManipComponent', () => {
  let component: HotelLocationManipComponent;
  let fixture: ComponentFixture<HotelLocationManipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelLocationManipComponent]
    });
    fixture = TestBed.createComponent(HotelLocationManipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

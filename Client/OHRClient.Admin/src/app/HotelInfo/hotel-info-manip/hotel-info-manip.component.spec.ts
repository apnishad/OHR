import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelInfoManipComponent } from './hotel-info-manip.component';

describe('HotelInfoManipComponent', () => {
  let component: HotelInfoManipComponent;
  let fixture: ComponentFixture<HotelInfoManipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelInfoManipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelInfoManipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

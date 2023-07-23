import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHotelInfoComponent } from './new-hotel-info.component';

describe('NewHotelInfoComponent', () => {
  let component: NewHotelInfoComponent;
  let fixture: ComponentFixture<NewHotelInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewHotelInfoComponent]
    });
    fixture = TestBed.createComponent(NewHotelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHotelInfoComponent } from './edit-hotel-info.component';

describe('EditHotelInfoComponent', () => {
  let component: EditHotelInfoComponent;
  let fixture: ComponentFixture<EditHotelInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHotelInfoComponent]
    });
    fixture = TestBed.createComponent(EditHotelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

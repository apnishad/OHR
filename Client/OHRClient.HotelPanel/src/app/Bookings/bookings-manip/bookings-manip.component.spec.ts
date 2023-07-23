import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsManipComponent } from './bookings-manip.component';

describe('BookingsManipComponent', () => {
  let component: BookingsManipComponent;
  let fixture: ComponentFixture<BookingsManipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsManipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsManipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

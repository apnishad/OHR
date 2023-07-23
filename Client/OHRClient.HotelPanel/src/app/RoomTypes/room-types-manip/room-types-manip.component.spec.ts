import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypesManipComponent } from './room-types-manip.component';

describe('RoomTypesManipComponent', () => {
  let component: RoomTypesManipComponent;
  let fixture: ComponentFixture<RoomTypesManipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomTypesManipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomTypesManipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

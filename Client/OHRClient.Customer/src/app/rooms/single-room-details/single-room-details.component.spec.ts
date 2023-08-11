import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRoomDetailsComponent } from './single-room-details.component';

describe('SingleRoomDetailsComponent', () => {
  let component: SingleRoomDetailsComponent;
  let fixture: ComponentFixture<SingleRoomDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRoomDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleRoomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

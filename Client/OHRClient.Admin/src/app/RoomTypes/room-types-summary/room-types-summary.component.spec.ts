import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypesSummaryComponent } from './room-types-summary.component';

describe('RoomTypesSummaryComponent', () => {
  let component: RoomTypesSummaryComponent;
  let fixture: ComponentFixture<RoomTypesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomTypesSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomTypesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

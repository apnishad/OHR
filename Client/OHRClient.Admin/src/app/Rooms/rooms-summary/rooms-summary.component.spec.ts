import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsSummaryComponent } from './rooms-summary.component';

describe('RoomsSummaryComponent', () => {
  let component: RoomsSummaryComponent;
  let fixture: ComponentFixture<RoomsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

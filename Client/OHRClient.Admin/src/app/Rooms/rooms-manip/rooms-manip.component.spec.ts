import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsManipComponent } from './rooms-manip.component';

describe('RoomsManipComponent', () => {
  let component: RoomsManipComponent;
  let fixture: ComponentFixture<RoomsManipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsManipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsManipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

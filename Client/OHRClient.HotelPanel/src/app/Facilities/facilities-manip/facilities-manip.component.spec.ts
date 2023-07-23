import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesManipComponent } from './facilities-manip.component';

describe('FacilitiesManipComponent', () => {
  let component: FacilitiesManipComponent;
  let fixture: ComponentFixture<FacilitiesManipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitiesManipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitiesManipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

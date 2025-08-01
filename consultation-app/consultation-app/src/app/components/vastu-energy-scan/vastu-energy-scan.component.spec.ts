import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VastuEnergyScanComponent } from './vastu-energy-scan.component';

describe('VastuEnergyScanComponent', () => {
  let component: VastuEnergyScanComponent;
  let fixture: ComponentFixture<VastuEnergyScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VastuEnergyScanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VastuEnergyScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

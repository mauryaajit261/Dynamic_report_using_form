import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VastuEnergyScanListComponent } from './vastu-energy-scan-list.component';

describe('VastuEnergyScanListComponent', () => {
  let component: VastuEnergyScanListComponent;
  let fixture: ComponentFixture<VastuEnergyScanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VastuEnergyScanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VastuEnergyScanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

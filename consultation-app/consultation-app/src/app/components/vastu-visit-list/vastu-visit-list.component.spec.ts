import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VastuVisitListComponent } from './vastu-visit-list.component';

describe('VastuVisitListComponent', () => {
  let component: VastuVisitListComponent;
  let fixture: ComponentFixture<VastuVisitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VastuVisitListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VastuVisitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VastuVisitFormComponent } from './vastu-visit-form.component';

describe('VastuVisitFormComponent', () => {
  let component: VastuVisitFormComponent;
  let fixture: ComponentFixture<VastuVisitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VastuVisitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VastuVisitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vastuvisit2formComponent } from './vastuvisit2form.component';

describe('Vastuvisit2formComponent', () => {
  let component: Vastuvisit2formComponent;
  let fixture: ComponentFixture<Vastuvisit2formComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vastuvisit2formComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vastuvisit2formComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

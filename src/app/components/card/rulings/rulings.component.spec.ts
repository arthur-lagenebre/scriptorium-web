import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulingsComponent } from './rulings.component';

describe('RulingsComponent', () => {
  let component: RulingsComponent;
  let fixture: ComponentFixture<RulingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

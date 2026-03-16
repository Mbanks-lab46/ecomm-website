import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonFound } from './non-found';

describe('NonFound', () => {
  let component: NonFound;
  let fixture: ComponentFixture<NonFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonFound],
    }).compileComponents();

    fixture = TestBed.createComponent(NonFound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

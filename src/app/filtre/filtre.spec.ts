import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filtre } from './filtre';

describe('Filtre', () => {
  let component: Filtre;
  let fixture: ComponentFixture<Filtre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filtre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Filtre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

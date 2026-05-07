import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLieux } from './section-lieux';

describe('SectionLieux', () => {
  let component: SectionLieux;
  let fixture: ComponentFixture<SectionLieux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionLieux]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionLieux);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

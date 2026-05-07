import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLieuxTouristiques } from './page-lieux-touristiques';

describe('PageLieuxTouristiques', () => {
  let component: PageLieuxTouristiques;
  let fixture: ComponentFixture<PageLieuxTouristiques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLieuxTouristiques]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLieuxTouristiques);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

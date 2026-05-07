import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteLieu } from './carte-lieu';

describe('CarteLieu', () => {
  let component: CarteLieu;
  let fixture: ComponentFixture<CarteLieu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteLieu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteLieu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

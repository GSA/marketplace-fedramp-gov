import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMarketplaceComponent } from './about-marketplace.component';

describe('AboutMarketplaceComponent', () => {
  let component: AboutMarketplaceComponent;
  let fixture: ComponentFixture<AboutMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMarketplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

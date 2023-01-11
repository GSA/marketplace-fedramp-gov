import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyInfoComponent } from './agency-info.component';

describe('AgencyInfoComponent', () => {
  let component: AgencyInfoComponent;
  let fixture: ComponentFixture<AgencyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciesMainComponent } from './agencies-main.component';

describe('AgenciesMainComponent', () => {
  let component: AgenciesMainComponent;
  let fixture: ComponentFixture<AgenciesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenciesMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgenciesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

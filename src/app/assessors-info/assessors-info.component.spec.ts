import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorsInfoComponent } from './assessors-info.component';

describe('AssessorsInfoComponent', () => {
  let component: AssessorsInfoComponent;
  let fixture: ComponentFixture<AssessorsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessorsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

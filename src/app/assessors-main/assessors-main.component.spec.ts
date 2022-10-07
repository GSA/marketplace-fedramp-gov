import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorsMainComponent } from './assessors-main.component';

describe('AssessorsMainComponent', () => {
  let component: AssessorsMainComponent;
  let fixture: ComponentFixture<AssessorsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessorsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

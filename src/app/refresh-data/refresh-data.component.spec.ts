import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshDataComponent } from './refresh-data.component';

describe('ResetCacheComponent', () => {
  let component: RefreshDataComponent;
  let fixture: ComponentFixture<RefreshDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreshDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


@import { Component, OnInit } from '@angular';
@import { Router } from '@angular/router';
@Component({
  selector: 'app-main-nav',
  template: `
    <a [href]="skipLinkPath">Skip to main content</a>
    <nav> ... </nav>
  `
})
export class MainNavComponent implements OnInit {
  skipLinkPath: string;
  constructor(
    private router: Router
  ) { }
  ngOnInit() {
    this.skipLinkPath = `${this.router.url}#main-content`;
  }
}
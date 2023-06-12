import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { ViewportScroller } from '@angular/common'; @Component({ selector: 'component-selector', templateUrl: './nav.component.html' }) export class MyComponent { constructor(private viewportScroller: ViewportScroller) {} public onClick(elementId: string): void { this.viewportScroller.scrollToAnchor(elementId); } }

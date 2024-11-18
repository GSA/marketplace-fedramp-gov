import { Component, inject } from '@angular/core';
import { CacheFactory } from './cache-factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  title = 'new-fedramp-marketplace';

  private cf = inject(CacheFactory);

  constructor() { }

}

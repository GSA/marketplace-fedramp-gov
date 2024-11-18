import { Component, OnInit, inject } from '@angular/core';
import { CacheFactory } from '../cache-factory';

@Component({
  selector: 'app-about-marketplace',
  templateUrl: './about-marketplace.component.html',
  styleUrls: ['./about-marketplace.component.scss']
})

export class AboutMarketplaceComponent implements OnInit {

  cf = inject(CacheFactory);
  
  constructor() {}
  async ngOnInit(): Promise<void> {}
  
}

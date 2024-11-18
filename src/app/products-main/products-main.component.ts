import { Component, OnInit, inject } from '@angular/core';
import { CacheFactory } from '../cache-factory';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.scss']
})

export class ProductsMainComponent implements OnInit {

  cf = inject(CacheFactory);

  constructor() {}

  async ngOnInit(): Promise<void> {
  }
}

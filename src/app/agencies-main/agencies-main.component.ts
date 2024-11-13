import { Component, OnInit, inject } from '@angular/core';
import { CacheFactory } from '../cache-factory';

@Component({
  selector: 'app-agencies-main',
  templateUrl: './agencies-main.component.html',
  styleUrls: ['./agencies-main.component.scss']
})

export class AgenciesMainComponent {

  cf = inject(CacheFactory);
  
  constructor() {}
}
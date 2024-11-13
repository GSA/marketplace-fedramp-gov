import { Component, OnInit, inject } from '@angular/core';
import { CacheFactory } from '../cache-factory';

@Component({
  selector: 'app-assessors-main',
  templateUrl: './assessors-main.component.html',
  styleUrls: ['./assessors-main.component.scss']
})

export class AssessorsMainComponent {

  cf = inject(CacheFactory);
  
  constructor() {}
}

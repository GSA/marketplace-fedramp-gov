import { Component, OnInit } from '@angular/core';
import { AppConstants } from './app.constants';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as LZString from 'lz-string';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppConstants, DatePipe, HttpClient]
})

export class AppComponent {

  title = 'new-fedramp-marketplace';
      
  cacheProducts: any | null;

  cacheAgencies: any | null;
  cacheAssessors: any | null;
  cacheFilters: any | null;
  cacheMetrics: any | null;
  cacheAtoMapping: any | null;
  cacheReuseMapping: any | null;

  cacheDate: string | null;
  formatDate: string | null;

  Products: any | null;
  Agencies: any | null;
  Assessors: any | null;
  Filters: any | null;
  Metrics: any | null;

  AtoMapping: any | null;
  ReuseMapping: any | null;

  url: string;

  constructor(public AppConstants: AppConstants, private dp: DatePipe, private hc: HttpClient) {

    this.url = AppConstants.GIT_URL;

    this.cacheDate = localStorage.getItem('cacheDate');
    this.formatDate = this.dp.transform(Date.now(), 'yyyy-MM-dd');

    this.cacheProducts = LZString.decompressFromUTF16(localStorage.getItem('cacheProducts') || '{}');
    this.cacheAgencies = LZString.decompressFromUTF16(localStorage.getItem('cacheAgencies') || '{}');
    this.cacheAssessors = LZString.decompressFromUTF16(localStorage.getItem('cacheAssessors') || '{}');
    this.cacheFilters = LZString.decompressFromUTF16(localStorage.getItem('cacheFilters') || '{}');
    this.cacheMetrics = LZString.decompressFromUTF16(localStorage.getItem('cacheMetrics') || '{}');
    this.cacheAtoMapping = LZString.decompressFromUTF16(localStorage.getItem('cacheAtoMapping') || '{}');
    this.cacheReuseMapping = LZString.decompressFromUTF16(localStorage.getItem('cacheReuseMapping') || '{}');

  }

  ngOnInit(): void {

    if(this.cacheDate == null || this.cacheDate != this.formatDate
      || this.cacheProducts == null 
      || this.cacheAgencies == null 
      || this.cacheAssessors == null 
      || this.cacheFilters == null 
      || this.cacheMetrics == null
      || this.cacheAtoMapping == null 
      || this.cacheReuseMapping == null) {

      this.hc.get(this.url).subscribe(
        (resp) => {
    
          let json = JSON.parse(JSON.stringify(resp));
          
          localStorage.setItem("cacheDate", this.formatDate!);
          localStorage.setItem("cacheProducts", LZString.compressToUTF16(JSON.stringify(json.data.Products) || '{}'));
          localStorage.setItem("cacheAgencies",  LZString.compressToUTF16(JSON.stringify(json.data.Agencies) || '{}'));
          localStorage.setItem("cacheAssessors",  LZString.compressToUTF16(JSON.stringify(json.data.Assessors) || '{}'));
          localStorage.setItem("cacheFilters",  LZString.compressToUTF16(JSON.stringify(json.data.Filters) || '{}'));
          localStorage.setItem("cacheMetrics",  LZString.compressToUTF16(JSON.stringify(json.data.Metrics) || '{}'));
          localStorage.setItem("cacheAtoMapping",  LZString.compressToUTF16(JSON.stringify(json.data.AtoMapping).replace(/\r/g,'').replace(/T20:00:00.000Z/g,'') || '{}'));
          localStorage.setItem("cacheReuseMapping", LZString.compressToUTF16(JSON.stringify(json.data.ReuseMapping).replace(/\r/g,'').replace(/T20:00:00.000Z/g,'') || '{}'));

       }
      );
    }
  }
}

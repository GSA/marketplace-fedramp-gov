import { Component, OnInit } from '@angular/core';
import { AppConstants } from './app.constants';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

    this.cacheProducts = localStorage.getItem('cacheProducts');
    
    this.cacheDate = sessionStorage.getItem('cacheDate');
    this.formatDate = this.dp.transform(Date.now(), 'yyyy-MM-dd');

    this.cacheAgencies = sessionStorage.getItem('cacheAgencies');
    this.cacheAssessors = sessionStorage.getItem('cacheAssessors');
    this.cacheFilters = sessionStorage.getItem('cacheFilters');
    this.cacheMetrics = sessionStorage.getItem('cacheMetrics');
    this.cacheAtoMapping = sessionStorage.getItem('cacheAtoMapping');
    this.cacheReuseMapping = sessionStorage.getItem('cacheReuseMapping');

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


          localStorage.removeItem('cacheDate'); 
          localStorage.removeItem('cacheAgencies');
          localStorage.removeItem('cacheAssessors');
          localStorage.removeItem('cacheFilters');
          localStorage.removeItem('cacheMetrics');

          localStorage.setItem("cacheProducts", JSON.stringify(json.data.Products));

          sessionStorage.setItem("cacheDate", this.formatDate!);
          sessionStorage.setItem("cacheAgencies",  JSON.stringify(json.data.Agencies));
          sessionStorage.setItem("cacheAssessors",  JSON.stringify(json.data.Assessors));
          sessionStorage.setItem("cacheFilters",  JSON.stringify(json.data.Filters));
          sessionStorage.setItem("cacheMetrics",  JSON.stringify(json.data.Metrics));
          sessionStorage.setItem("cacheAtoMapping",  JSON.stringify(json.data.AtoMapping).replace(/\r/g,'').replace(/T20:00:00.000Z/g,''));
          sessionStorage.setItem("cacheReuseMapping", JSON.stringify(json.data.ReuseMapping).replace(/\r/g,'').replace(/T20:00:00.000Z/g,''));
          
       }
      );
    }
  }
}

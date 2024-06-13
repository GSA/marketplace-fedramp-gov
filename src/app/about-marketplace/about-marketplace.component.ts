import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'app-about-marketplace',
  templateUrl: './about-marketplace.component.html',
  styleUrls: ['./about-marketplace.component.scss'],
  providers: [AppConstants, DatePipe]
})

export class AboutMarketplaceComponent implements OnInit {

  delay: number;
  
  isCachePresent = false;

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

  constructor(public AppConstants: AppConstants, private dp: DatePipe) {
    
    this.delay = AppConstants.CACHE_DELAY;

    this.cacheDate = localStorage.getItem('cacheDate');
    this.formatDate = this.dp.transform(Date.now(), 'yyyy-MM-dd');

    this.cacheProducts = localStorage.getItem('cacheProducts');
    this.cacheAgencies = localStorage.getItem('cacheAgencies');
    this.cacheAssessors = localStorage.getItem('cacheAssessors');
    this.cacheFilters = localStorage.getItem('cacheFilters');
    this.cacheMetrics = localStorage.getItem('cacheMetrics');

    this.cacheAtoMapping = sessionStorage.getItem('cacheAtoMapping');
    this.cacheReuseMapping = sessionStorage.getItem('cacheReuseMapping');
  }

  async ngOnInit(): Promise<void> {

    if(this.cacheDate == null || this.cacheDate != this.formatDate
      || this.cacheProducts == null 
      || this.cacheAgencies == null 
      || this.cacheAssessors == null 
      || this.cacheFilters == null 
      || this.cacheMetrics == null
      || this.cacheAtoMapping == null 
      || this.cacheReuseMapping == null) {

      await this.getJsonData();

      for (let i = 0; !this.isCachePresent; i++) {

        if(this.cacheDate == null || this.cacheDate != this.formatDate
          || this.cacheProducts == null 
          || this.cacheAgencies == null 
          || this.cacheAssessors == null 
          || this.cacheFilters == null 
          || this.cacheMetrics == null
          || this.cacheAtoMapping == null 
          || this.cacheReuseMapping == null) {

          await new Promise(p => setTimeout(p, this.delay));
          await this.getJsonData();
        }
      }
    } else {

      this.Products = JSON.parse(this.cacheProducts!);
      this.Agencies =  JSON.parse(this.cacheAgencies!);
      this.Assessors =  JSON.parse(this.cacheAssessors!);
      this.Filters =  JSON.parse(this.cacheFilters!);
      this.Metrics =  JSON.parse(this.cacheMetrics!);

      this.AtoMapping =  JSON.parse(this.cacheAtoMapping!);
      this.ReuseMapping =  JSON.parse(this.cacheReuseMapping!);

      this.isCachePresent = true;
    }
  }

  getJsonData(): Promise<void> {
    return new Promise((resolve, reject) => {

      this.cacheDate = localStorage.getItem('cacheDate');

      this.cacheProducts = localStorage.getItem('cacheProducts');
      this.cacheAgencies = localStorage.getItem('cacheAgencies');
      this.cacheAssessors = localStorage.getItem('cacheAssessors');
      this.cacheFilters = localStorage.getItem('cacheFilters');
      this.cacheMetrics = localStorage.getItem('cacheMetrics');

      this.cacheAtoMapping = sessionStorage.getItem('cacheAtoMapping');
      this.cacheReuseMapping = sessionStorage.getItem('cacheReuseMapping');

      if (this.cacheDate != null && this.cacheDate == this.formatDate
        && this.cacheProducts != null 
        && this.cacheAgencies != null 
        && this.cacheAssessors != null 
        && this.cacheFilters != null 
        && this.cacheMetrics != null 
        && this.cacheAtoMapping != null 
        && this.cacheReuseMapping != null) {

          this.Products = JSON.parse(this.cacheProducts!);
          this.Agencies =  JSON.parse(this.cacheAgencies!);
          this.Assessors =  JSON.parse(this.cacheAssessors!);
          this.Filters =  JSON.parse(this.cacheFilters!);
          this.Metrics =  JSON.parse(this.cacheMetrics!);

          this.AtoMapping =  JSON.parse(this.cacheAtoMapping!);
          this.ReuseMapping =  JSON.parse(this.cacheReuseMapping!);

        this.isCachePresent = true;
      }
      resolve();
    });
  }
}

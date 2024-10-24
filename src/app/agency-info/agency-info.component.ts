import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'app-agency-info',
  templateUrl: './agency-info.component.html',
  styleUrls: ['./agency-info.component.scss'],
  providers: [AppConstants, DatePipe]
})
export class AgencyInfoComponent implements OnInit {

  id: string | null;

  delay: number;
  isCachePresent = false;

  cacheAgencies: any | null;
  Agencies: any | null;

  cacheDate: string | null;
  formatDate: string | null;

  agency: any | null;
  
  constructor(public AppConstants: AppConstants, private dp: DatePipe, private route: ActivatedRoute) {    

    this.delay = AppConstants.CACHE_DELAY;

    this.cacheDate = sessionStorage.getItem('cacheDate');
    this.formatDate = this.dp.transform(Date.now(), 'yyyy-MM-dd');

    this.cacheAgencies = sessionStorage.getItem('cacheAgencies');

    this.id = null;
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  async ngOnInit(): Promise<void> {    

    if(this.cacheDate == null || this.cacheDate != this.formatDate
      || this.cacheAgencies == null) {

      await this.getJsonData();

      for(let i = 0; !this.isCachePresent; i++) {

        if(this.cacheDate == null || this.cacheDate != this.formatDate
          || this.cacheAgencies == null) {

          await new Promise(p => setTimeout(p,this.delay));
          await this.getJsonData();
        }
      }
    } else {

      this.Agencies = JSON.parse(this.cacheAgencies!);
      this.agency = this.Agencies.find((i: { id: any; }) => i.id == this.id);

      this.isCachePresent = true;
    }
  }

  getJsonData(): Promise<void> {
    return new Promise((resolve, reject) => {

      this.cacheAgencies = sessionStorage.getItem('cacheAgencies');
      this.cacheDate = sessionStorage.getItem('cacheDate');

      if(this.cacheDate != null && this.cacheDate == this.formatDate
        && this.cacheAgencies != null) {

        this.Agencies = JSON.parse(this.cacheAgencies!);
        this.agency = this.Agencies.find((i: { id: any; }) => i.id == this.id);

        this.isCachePresent = true;
      }
      resolve();
    });
  }
}

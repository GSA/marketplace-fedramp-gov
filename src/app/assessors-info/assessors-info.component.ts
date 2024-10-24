import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'app-assessors-info',
  templateUrl: './assessors-info.component.html',
  styleUrls: ['./assessors-info.component.scss'],
  providers: [AppConstants, DatePipe]
})

export class AssessorsInfoComponent implements OnInit {
  
  id: string | null;

  delay: number;
  isCachePresent = false;

  cacheAssessors: any | null;
  Assessors: any | null;

  cacheDate: string | null;
  formatDate: string | null;

  assessor: any | null;
  
  constructor(public AppConstants: AppConstants, private dp: DatePipe, private route: ActivatedRoute) {    
    
    this.delay = AppConstants.CACHE_DELAY;

    this.cacheDate = sessionStorage.getItem('cacheDate');
    this.formatDate = this.dp.transform(Date.now(), 'yyyy-MM-dd');

    this.cacheAssessors = sessionStorage.getItem('cacheAssessors');

    this.id = null;
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  async ngOnInit(): Promise<void> {    

    if(this.cacheDate == null  || this.cacheDate != this.formatDate
      || this.cacheAssessors == null) {

      await this.getJsonData();

      for(let i = 0; !this.isCachePresent; i++) {

        if(this.cacheDate == null || this.cacheDate != this.formatDate
          || this.cacheAssessors == null) {

          await new Promise(p => setTimeout(p,this.delay));
          await this.getJsonData();
        }
      }
    } else {

      this.Assessors = JSON.parse(this.cacheAssessors!);
      this.assessor = this.Assessors.find((i: { id: any; }) => i.id == this.id);

      this.isCachePresent = true;
    }
  }

  getJsonData(): Promise<void> {
    return new Promise((resolve, reject) => {

      this.cacheDate = localStorage.getItem('cacheDate');
      this.cacheAssessors = localStorage.getItem('cacheJson');

      if(this.cacheDate != null && this.cacheDate == this.formatDate
        && this.cacheAssessors != null) {

        this.Assessors = JSON.parse(this.cacheAssessors!);
        this.assessor = this.Assessors.find((i: { id: any; }) => i.id == this.id);

        this.isCachePresent = true;
      }
      resolve();
    });
  }
}

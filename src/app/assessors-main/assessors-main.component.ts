import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'app-assessors-main',
  templateUrl: './assessors-main.component.html',
  styleUrls: ['./assessors-main.component.scss'],
  providers: [AppConstants, DatePipe]
})

export class AssessorsMainComponent implements OnInit {

  delay: number;
  isCachePresent = false;

  cacheJson: any | null;
  parseJson: any | null;

  cacheDate: string | null;
  formatDate: string | null;

  data: any | null;
  
  constructor(public AppConstants: AppConstants, private dp: DatePipe) {    
    this.cacheJson = localStorage.getItem('cacheJson');
    this.cacheDate = localStorage.getItem('cacheDate');
    this.formatDate = this.dp.transform(Date.now(), 'yyyy-MM-dd');
    this.delay = AppConstants.CACHE_DELAY;
  }

  async ngOnInit(): Promise<void> {    

    if(this.cacheDate == null || this.cacheJson == null || this.cacheDate != this.formatDate) {

      await this.getJsonData();

      for(let i = 0; !this.isCachePresent; i++) {

        if(this.cacheDate == null || this.cacheJson == null || this.cacheDate != this.formatDate) {

          await new Promise(p => setTimeout(p,1000));
          await this.getJsonData();
        }
      }
    } else {
      this.parseJson = JSON.parse(this.cacheJson!);
      this.data = this.parseJson.data;
      this.isCachePresent = true;
    }
  }

  getJsonData(): Promise<void> {
    return new Promise((resolve, reject) => {

      this.cacheJson = localStorage.getItem('cacheJson');
      this.cacheDate = localStorage.getItem('cacheDate');

      if(this.cacheDate != null && this.cacheJson != null && this.cacheDate == this.formatDate) {
        this.parseJson = JSON.parse(this.cacheJson!);
        this.data = this.parseJson.data;
        this.isCachePresent = true;
      }
      resolve();
    });
  }
}

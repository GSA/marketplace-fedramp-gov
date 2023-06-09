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
      
  cacheDate: string | null;
  cacheJson: string | null;
  formatDate: string | null;
  url: string;

  constructor(public AppConstants: AppConstants, private dp: DatePipe, private hc: HttpClient) {
    this.cacheDate = localStorage.getItem('cacheDate');
    this.cacheJson = localStorage.getItem('cacheJson');
    this.formatDate = this.dp.transform(Date.now(), 'yyyy-MM-dd');
    this.url = AppConstants.GIT_URL;
  }

  ngOnInit(): void {
    if(this.cacheDate == null || this.cacheJson == null || this.cacheDate != this.formatDate) {
      this.hc.get(this.url).subscribe(
        (resp) => {                           
          localStorage.setItem("cacheJson", JSON.stringify(resp));      
          localStorage.setItem("cacheDate", this.formatDate!);
        }
      );
    }
  }
}

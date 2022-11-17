import { Component } from '@angular/core';
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

  constructor(public AppConstants: AppConstants, private dp: DatePipe, private hc: HttpClient) {

    this.cacheDate = localStorage.getItem('cacheDate');
    this.cacheJson = localStorage.getItem('cacheJson');
    this.formatDate = this.dp.transform(Date.now(), 'yyyy-MM-dd');

    if(this.cacheDate == null || this.cacheJson == null || this.cacheDate != this.formatDate) {
      localStorage.setItem("cacheDate", this.formatDate!)
//         console.log("GETTING NEW CACHE!");
        this.hc.get(AppConstants.GIT_URL).subscribe(
        (resp) => {                           
          localStorage.setItem("cacheJson", JSON.stringify(resp));
        });
//     } else {
//       console.log("KEEPING OLD CACHE");
    }
  }
}

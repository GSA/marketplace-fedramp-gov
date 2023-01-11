import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
  providers: [AppConstants, DatePipe]
})

export class ProductInfoComponent implements OnInit {

  id: string | null;
  delay: number;
  isCachePresent = false;

  cacheJson: any | null;
  parseJson: any | null;

  cacheDate: string | null;
  formatDate: string | null;

  product: any | null;
  gridClass = "grid-col-4";
  
  constructor(public AppConstants: AppConstants, private dp: DatePipe, private route: ActivatedRoute) {    

    this.cacheJson = localStorage.getItem('cacheJson');
    this.cacheDate = localStorage.getItem('cacheDate');
    this.formatDate = this.dp.transform(Date.now(), 'yyyy-MM-dd');
    this.delay = AppConstants.CACHE_DELAY;

    this.id = null;

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
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
      this.product = this.parseJson.data.Products.find((i: { id: any; }) => i.id == this.id);
      this.isCachePresent = true;
      
      if(this.product.auth_type == 'Agency') {
        this.gridClass = "grid-col-3";
      }
    }
  }

  getJsonData(): Promise<void> {
    return new Promise((resolve, reject) => {

      this.cacheJson = localStorage.getItem('cacheJson');
      this.cacheDate = localStorage.getItem('cacheDate');

      if(this.cacheDate != null && this.cacheJson != null && this.cacheDate == this.formatDate) {
        this.parseJson = JSON.parse(this.cacheJson!);
        this.product = this.parseJson.data.Products.find((i: { id: any; }) => i.id == this.id);
        this.isCachePresent = true;
        
        if(this.product.auth_type == 'Agency') {
          this.gridClass = "grid-col-3";
        }
      }
      resolve();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  
  product: any | null;
  
  constructor(private route: ActivatedRoute) { 

    var cacheJson = localStorage.getItem('cacheJson');
    var parseJson = JSON.parse(cacheJson!);

    this.route.params.subscribe(params => {

      this.product = parseJson.data.Products.find((i: { id: any; }) => i.id == params['id']);

      if(this.product == null) {
        // route away?
      }
    });
  }
}

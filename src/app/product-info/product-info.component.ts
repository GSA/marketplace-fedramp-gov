import { Component, OnInit, inject } from '@angular/core';
import { CacheFactory } from '../cache-factory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})

export class ProductInfoComponent implements OnInit {

  cf = inject(CacheFactory);

  id: string | null;
  product: any | null;

  gridClass = "grid-col-4";
  
  constructor(private route: ActivatedRoute) {    
    this.id = null;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  async ngOnInit(): Promise<void> {   
    this.product = this.cf.Products.find((i: { id: any; }) => i.id == this.id);
    if(this.product.auth_type == 'Agency' || this.product.auth_type == 'Program') {
      this.gridClass = "grid-col-3";
    } 
  }
}

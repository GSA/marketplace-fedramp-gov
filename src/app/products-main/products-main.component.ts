import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.scss']
})

export class ProductsMainComponent implements OnInit {

  data: any;
  
  constructor() { 

    var cacheJson = localStorage.getItem('cacheJson');
    var parseJson = JSON.parse(cacheJson!);
    
    // can parse into data.Products if useful later?
    this.data = parseJson.data;
  }

  ngOnInit(): void {
  }

}

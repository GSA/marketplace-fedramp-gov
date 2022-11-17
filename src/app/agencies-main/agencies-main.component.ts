import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agencies-main',
  templateUrl: './agencies-main.component.html',
  styleUrls: ['./agencies-main.component.scss']
})
export class AgenciesMainComponent implements OnInit {

  data: any;
  
  constructor() { 

    var cacheJson = localStorage.getItem('cacheJson');
    var parseJson = JSON.parse(cacheJson!);
    
    this.data = parseJson.data;
  }

  ngOnInit(): void {
  }

}

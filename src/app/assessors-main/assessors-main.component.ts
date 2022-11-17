import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessors-main',
  templateUrl: './assessors-main.component.html',
  styleUrls: ['./assessors-main.component.scss']
})
export class AssessorsMainComponent implements OnInit {

  data: any;
  
  constructor() { 

    var cacheJson = localStorage.getItem('cacheJson');
    var parseJson = JSON.parse(cacheJson!);
    
    this.data = parseJson.data;
  }

  ngOnInit(): void {
  }

}


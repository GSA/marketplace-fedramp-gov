import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refresh-data',
  templateUrl: './refresh-data.component.html',
  styleUrls: ['./refresh-data.component.scss']
})

export class RefreshDataComponent implements OnInit {
  constructor() {  
    localStorage.removeItem("cacheJson");
    localStorage.removeItem("cacheDate");
    localStorage.removeItem("cacheProducts");
    localStorage.removeItem("cacheAgencies");
    localStorage.removeItem("cacheAssessors");
    localStorage.removeItem("cacheFilters");
    localStorage.removeItem("cacheMetrics");
    localStorage.removeItem("cacheAtoMapping");
    localStorage.removeItem("cacheReuseMapping");  
  }
  ngOnInit(): void {}
}

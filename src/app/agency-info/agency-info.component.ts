import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agency-info',
  templateUrl: './agency-info.component.html',
  styleUrls: ['./agency-info.component.scss']
})
export class AgencyInfoComponent implements OnInit {

  agency: any | null;
  
  constructor(private route: ActivatedRoute) { 

    var cacheJson = localStorage.getItem('cacheJson');
    var parseJson = JSON.parse(cacheJson!);

    this.route.params.subscribe(params => {
      this.agency = parseJson.data.Agencies.find((i: { id: any; }) => i.id == params['id']);

      if(this.agency == null) {
        //route away?
      }
    });
  }
}

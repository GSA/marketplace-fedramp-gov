import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assessors-info',
  templateUrl: './assessors-info.component.html',
  styleUrls: ['./assessors-info.component.scss']
})
export class AssessorsInfoComponent implements OnInit {

  assessor: any | null;
  
  constructor(private route: ActivatedRoute) { 
    
    var cacheJson = localStorage.getItem('cacheJson');
    var parseJson = JSON.parse(cacheJson!);

    this.route.params.subscribe(params => {

      this.assessor = parseJson.data.Assessors.find((i: { id: any; }) => i.id == params['id']);

      if(this.assessor == null) {
        //route away?
      }
    });
  }
}

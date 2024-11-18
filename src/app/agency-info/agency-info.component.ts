import { Component, OnInit, inject } from '@angular/core';
import { CacheFactory } from '../cache-factory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agency-info',
  templateUrl: './agency-info.component.html',
  styleUrls: ['./agency-info.component.scss']
})

export class AgencyInfoComponent implements OnInit {

  cf = inject(CacheFactory);

  id: string | null;
  agency: any | null;
  
  constructor(private route: ActivatedRoute) {    
    this.id = null;   
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  async ngOnInit(): Promise<void> {    
      this.agency = this.cf.Agencies.find((i: { id: any; }) => i.id == this.id);
  }
}

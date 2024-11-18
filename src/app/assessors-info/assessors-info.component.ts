import { Component, OnInit, inject } from '@angular/core';
import { CacheFactory } from '../cache-factory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assessors-info',
  templateUrl: './assessors-info.component.html',
  styleUrls: ['./assessors-info.component.scss']
})

export class AssessorsInfoComponent implements OnInit {
  
  cf = inject(CacheFactory);

  id: string | null;
  assessor: any | null;
  
  constructor(private route: ActivatedRoute) {    
    this.id = null;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  async ngOnInit(): Promise<void> {    
      this.assessor = this.cf.Assessors.find((i: { id: any; }) => i.id == this.id);
  }
}

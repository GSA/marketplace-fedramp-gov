import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'app-agencies-main',
  templateUrl: './agencies-main.component.html',
  styleUrls: ['./agencies-main.component.scss'],
  providers: [AppConstants, DatePipe]
})
export class AgenciesMainComponent implements OnInit {

  delay: number;
  isCachePresent = false;

  cacheJson: any | null;
  parseJson: any | null;

  cacheDate: string | null;
  formatDate: string | null;

  data: any | null;
  
  constructor(public AppConstants: AppConstants, private dp: DatePipe) {    
    this.cacheJson = localStorage.getItem('cacheJson');
    this.cacheDate = localStorage.getItem('cacheDate');
    this.formatDate = this.dp.transform(Date.now(), 'yyyy-MM-dd');
    this.delay = AppConstants.CACHE_DELAY;
  }

  async ngOnInit(): Promise<void> {    

    if(this.cacheDate == null || this.cacheJson == null || this.cacheDate != this.formatDate) {

      await this.getJsonData();

      for(let i = 0; !this.isCachePresent; i++) {

        if(this.cacheDate == null || this.cacheJson == null || this.cacheDate != this.formatDate) {

          await new Promise(p => setTimeout(p,1000));
          await this.getJsonData();
        }
      }
    } else {
      this.parseJson = JSON.parse(this.cacheJson!);
      this.data = this.parseJson.data;
      this.isCachePresent = true;
    }
  }

  getJsonData(): Promise<void> {
    return new Promise((resolve, reject) => {

      this.cacheJson = localStorage.getItem('cacheJson');
      this.cacheDate = localStorage.getItem('cacheDate');

      if(this.cacheDate != null && this.cacheJson != null && this.cacheDate == this.formatDate) {
        this.parseJson = JSON.parse(this.cacheJson!);
        this.data = this.parseJson.data;
        this.isCachePresent = true;
      }
      resolve();
    });
  }


  csvFromAtoData() {

    let csv = "data:text/csv;charset=utf-8,";
        
    csv += "\"FedRAMP ID\",\"Cloud Service Provider\",\"Cloud Service Offering\",\"Service Description\",\"Business Categories\",\"Service Model\",\"Status\",\"Independent Assessor\",\"Parent Agency\",\"Sub Agency\",\"ATO Issuance Date\",\"FedRAMP Authorization Date\",\"ATO Expiration Date\"\r\n";

    for(var i = 0; i < this.data.Products.length; i++) {

        for(var j = 0; j < this.data.Products[i].agency_authorizations.length; j++) {

            for(var k = 0; k < this.data.Agencies.length; k++) {

                if(this.data.Products[i].agency_authorizations[j] == this.data.Agencies[k].sub
                || (this.data.Products[i].agency_authorizations[j] == this.data.Agencies[k].parent
                    && this.data.Agencies[k].sub == "")) {

                    csv += "\"" +   this.data.Products[i].id.replace(/"/g, '""') + "\",\"" +
                                    this.data.Products[i].csp.replace(/"/g, '""') + "\",\"" +
                                    this.data.Products[i].cso.replace(/"/g, '""') + "\",\"" +
                                    this.data.Products[i].service_desc.replace(/"/g, '""') + "\",\"" +
                                    this.data.Products[i].business_function.join(',').replace(/"/g, '""') + "\",\"" +
                                    this.data.Products[i].service_model.join(',').replace(/"/g, '""') + "\",\"" +
                                    this.data.Products[i].status.replace(/"/g, '""') + "\",\"" +
                                    this.data.Products[i].independent_assessor.replace(/"/g, '""') + "\",\"" +
                                    this.data.Agencies[k].parent.replace(/"/g, '""') + "\",\"" +
                                    this.data.Agencies[k].sub.replace(/"/g, '""') + "\",\"" + 
                                    this.getAtoDates(this.data.Products[i].id, this.data.Agencies[k].id) +
                                    "\r\n";
                }
            }
        }
    }
    var date = new Date();
    var stamp = date.getFullYear().toString() + 
                this.zeroPad(date.getMonth() + 1) + 
                this.zeroPad(date.getDate()) + "-" +
                this.zeroPad(date.getHours()) + 
                this.zeroPad(date.getMinutes()) + 
                this.zeroPad(date.getSeconds());

    var uri = encodeURI(csv);

    var csvDownload = document.createElement("a");
    csvDownload.setAttribute("href", uri);
    csvDownload.setAttribute("download", "ato-" + stamp + ".csv");

    document.body.appendChild(csvDownload);
    csvDownload.click();
    document.body.removeChild(csvDownload);

  }


  getAtoDates(idProd: string, idAgency: string) {

    for(var i = 0; i < this.data.AtoMapping.length; i++) {

      if(this.data.AtoMapping[i].id == idProd
      && this.data.AtoMapping[i].agency_id == idAgency) {
        return this.data.AtoMapping[i].ato_date + "\",\"" +
              this.data.AtoMapping[i].auth_date + "\",\"" +
              this.data.AtoMapping[i].exp_date + "\"";
      }       
    }
    return "\",\"" + "\",\"" + "\"";
  }


  zeroPad(n: number) {
    return n < 10 ? '0' + n : n 
  }
}

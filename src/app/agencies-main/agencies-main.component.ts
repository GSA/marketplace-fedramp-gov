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

  atoLabel = "Export ATO Data"
  atoButtonDisabled = false;

  get isAtoDisabled(): boolean { 
    return this.atoButtonDisabled; 
  }
  
  csvFromAtoData() {

    this.atoLabel = "Downloading...";
    this.atoButtonDisabled = true;

    let csv = "data:text/csv;charset=utf-8,";
    let ato: Array<{ label: string, parent: string, sub: string, iss: string, auth: string, assess: string, exp: string }> = [];

    // headers
    csv += "\"FedRAMP ID\",\"Cloud Service Provider\",\"Cloud Service Offering\",\"Service Description\",\"Business Categories\",\"Service Model\",\"Status\",\"Independent Assessor\",\"Parent Agency\",\"Sub Agency\",\"ATO Issuance Date\",\"FedRAMP Authorization Date\",\"Annual Assessment Date\",\"ATO Expiration Date\"\r\n";

    // for all products
    for (var i = 0; i < this.data.Products.length; i++) {

      // skip products that have one blank agency
      if (this.data.Products[i].status == "FedRAMP Authorized") {

        // go build an array of "initial" and "resue" ATOs
        ato = this.getAtoDateArray(this.data.Products[i].id);
        
        // loop through ato array, writing one product line for each
        for (let k = 0; k < ato.length; k++) {
      
          csv += "\"" + this.data.Products[i].id.replace(/"/g, '""') + "\",\"" +
            this.data.Products[i].csp.replace(/"/g, '""') + "\",\"" +
            this.data.Products[i].cso.replace(/"/g, '""') + "\",\"" +
            this.data.Products[i].service_desc.replace(/"/g, '""').replace(/#/g, '%23') + "\",\"" +
            this.data.Products[i].business_function.join(',').replace(/"/g, '""') + "\",\"" +
            this.data.Products[i].service_model.join(',').replace(/"/g, '""') + "\",\"" +
            this.data.Products[i].status.replace(/"/g, '""') + "\",\"" +
            this.data.Products[i].independent_assessor.replace(/"/g, '""') + "\",\"" +
            ato[k].parent.replace(/"/g, '""') + "\",\"" +
            ato[k].sub.replace(/"/g, '""') + "\",\"" +
            // ato[k].label + "\",\"" +
            ato[k].iss + "\",\"" +
            ato[k].auth + "\",\"" +
            ato[k].assess + "\",\"" +
            ato[k].exp + "\"" +
            "\r\n";
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

    this.atoLabel = "Export ATO Data";
    this.atoButtonDisabled = false;
  }

  getAtoDateArray(idProd: string) {

    let list: Array<{ label: string, parent: string, sub: string, iss: string, auth: string, assess: string, exp: string }> = [];

    let iss = "";
    let auth = "";
    let assess = "";
    let exp = "";

    // find initial
    for (var i = 0; i < this.data.AtoMapping.length; i++) {
      
      if (this.data.AtoMapping[i].id == idProd) {
        
        // these fall through to reuse
        auth = this.getDateTimeField(this.data.AtoMapping[i].auth_date);
        assess = this.reformatSomeDates(this.data.AtoMapping[i].assessment_date);

        iss = this.getDateTimeField(this.data.AtoMapping[i].ato_date);
        exp = this.getDateTimeField(this.data.AtoMapping[i].exp_date);

        if (iss != "" && exp == "") {
          exp = "Continuous ATO";
        }

        list.push({label: "Initial", parent: this.data.AtoMapping[i].parent, sub: this.data.AtoMapping[i].sub, iss, auth, assess, exp});
        break;
      }
    }

    // find all reuse
    for (var i = 0; i < this.data.ReuseMapping.length; i++) {

      if (this.data.ReuseMapping[i].id == idProd) {

          iss = this.getDateTimeField(this.data.ReuseMapping[i].ato_date);
          exp = this.getDateTimeField(this.data.ReuseMapping[i].exp_date);

          if (iss != "" && exp == "") {
            exp = "Continuous ATO";
          }

          list.push({label: "Reuse", parent: this.data.ReuseMapping[i].parent, sub: this.data.ReuseMapping[i].sub, iss, auth, assess, exp});
      }
    }

    return list;
  }

  // depending how the Apps Script feels, it either grabs the string 01/24 (which we want) or
  // a date 2024-01-24T20:00:00.000Z (which we can format into MM/DD)
  reformatSomeDates(inField: string) {
    return (inField.indexOf("T") == -1) ? inField : inField.slice(5,7) + "/" + inField.slice(8,10);
  }

  // slice the end of the date if it's present
  getDateTimeField(inField: string) {
    return (inField.indexOf("T") == -1) ? "" : inField.slice(0,inField.indexOf("T"));
  }

  zeroPad(n: number) {
    return n < 10 ? '0' + n : n
  }
}
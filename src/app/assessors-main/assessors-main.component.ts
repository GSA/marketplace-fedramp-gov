import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'app-assessors-main',
  templateUrl: './assessors-main.component.html',
  styleUrls: ['./assessors-main.component.scss'],
  providers: [AppConstants, DatePipe]
})

export class AssessorsMainComponent implements OnInit {

  delay: number;
  
  isCachePresent = false;

  cacheProducts: any | null;
  cacheAgencies: any | null;
  cacheAssessors: any | null;
  cacheFilters: any | null;
  cacheMetrics: any | null;

  cacheAtoMapping: any | null;
  cacheReuseMapping: any | null;
  
  cacheDate: string | null;
  formatDate: string | null;

  Products: any | null;
  Agencies: any | null;
  Assessors: any | null;
  Filters: any | null;
  Metrics: any | null;

  AtoMapping: any | null;
  ReuseMapping: any | null;

  constructor(public AppConstants: AppConstants, private dp: DatePipe) {
    
    this.delay = AppConstants.CACHE_DELAY;

    this.cacheDate = localStorage.getItem('cacheDate');
    this.formatDate = this.dp.transform(Date.now(), 'yyyy-MM-dd');

    this.cacheProducts = localStorage.getItem('cacheProducts');
    this.cacheAgencies = localStorage.getItem('cacheAgencies');
    this.cacheAssessors = localStorage.getItem('cacheAssessors');
    this.cacheFilters = localStorage.getItem('cacheFilters');
    this.cacheMetrics = localStorage.getItem('cacheMetrics');

    this.cacheAtoMapping = sessionStorage.getItem('cacheAtoMapping');
    this.cacheReuseMapping = sessionStorage.getItem('cacheReuseMapping');
  }

  async ngOnInit(): Promise<void> {

    if(this.cacheDate == null || this.cacheDate != this.formatDate
      || this.cacheProducts == null 
      || this.cacheAgencies == null 
      || this.cacheAssessors == null 
      || this.cacheFilters == null 
      || this.cacheMetrics == null
      || this.cacheAtoMapping == null 
      || this.cacheReuseMapping == null) {

      await this.getJsonData();

      for (let i = 0; !this.isCachePresent; i++) {

        if(this.cacheDate == null || this.cacheDate != this.formatDate
          || this.cacheProducts == null 
          || this.cacheAgencies == null 
          || this.cacheAssessors == null 
          || this.cacheFilters == null 
          || this.cacheMetrics == null
          || this.cacheAtoMapping == null 
          || this.cacheReuseMapping == null) {

          await new Promise(p => setTimeout(p, this.delay));
          await this.getJsonData();
        }
      }
    } else {

      this.Products = JSON.parse(this.cacheProducts!);
      this.Agencies =  JSON.parse(this.cacheAgencies!);
      this.Assessors =  JSON.parse(this.cacheAssessors!);
      this.Filters =  JSON.parse(this.cacheFilters!);
      this.Metrics =  JSON.parse(this.cacheMetrics!);

      this.AtoMapping =  JSON.parse(this.cacheAtoMapping!);
      this.ReuseMapping =  JSON.parse(this.cacheReuseMapping!);

      this.isCachePresent = true;
    }
  }

  getJsonData(): Promise<void> {
    return new Promise((resolve, reject) => {

      this.cacheDate = localStorage.getItem('cacheDate');

      this.cacheProducts = localStorage.getItem('cacheProducts');
      this.cacheAgencies = localStorage.getItem('cacheAgencies');
      this.cacheAssessors = localStorage.getItem('cacheAssessors');
      this.cacheFilters = localStorage.getItem('cacheFilters');
      this.cacheMetrics = localStorage.getItem('cacheMetrics');

      this.cacheAtoMapping = sessionStorage.getItem('cacheAtoMapping');
      this.cacheReuseMapping = sessionStorage.getItem('cacheReuseMapping');

      if (this.cacheDate != null && this.cacheDate == this.formatDate
        && this.cacheProducts != null 
        && this.cacheAgencies != null 
        && this.cacheAssessors != null 
        && this.cacheFilters != null 
        && this.cacheMetrics != null 
        && this.cacheAtoMapping != null 
        && this.cacheReuseMapping != null) {

          this.Products = JSON.parse(this.cacheProducts!);
          this.Agencies =  JSON.parse(this.cacheAgencies!);
          this.Assessors =  JSON.parse(this.cacheAssessors!);
          this.Filters =  JSON.parse(this.cacheFilters!);
          this.Metrics =  JSON.parse(this.cacheMetrics!);

          this.AtoMapping =  JSON.parse(this.cacheAtoMapping!);
          this.ReuseMapping =  JSON.parse(this.cacheReuseMapping!);

        this.isCachePresent = true;
      }
      resolve();
    });
  }
  atoLabel = "Export CSV Data"
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
    csv += "\"FedRAMP ID\",\"Cloud Service Provider\",\"Cloud Service Offering\",\"Service Description\",\"Business Categories\",\"Service Model\",\"Status\",\"Independent Assessor\",\"Authorizations\",\"Reuse\",\"Parent Agency\",\"Sub Agency\",\"ATO Issuance Date\",\"FedRAMP Authorization Date\",\"Annual Assessment Date\",\"ATO Expiration Date\"\r\n";

    // for all products
    for (var i = 0; i < this.Products.length; i++) {

      // go build an array of "initial" and "resue" ATOs
      ato = this.getAtoDateArray(this.Products[i].id);

      if (this.Products[i].status == "FedRAMP Authorized") {

        // loop through ato array, writing one product line for each
        for (let k = 0; k < ato.length; k++) {

          csv += "\"" + this.Products[i].id.replace(/"/g, '""') + "\",\"" +
            this.Products[i].csp.replace(/"/g, '""') + "\",\"" +
            this.Products[i].cso.replace(/"/g, '""') + "\",\"" +
            this.Products[i].service_desc.replace(/"/g, '""').replace(/#/g, '%23') + "\",\"" +
            this.Products[i].business_function.join(',').replace(/"/g, '""') + "\",\"" +
            this.Products[i].service_model.join(',').replace(/"/g, '""') + "\",\"" +
            this.Products[i].status.replace(/"/g, '""') + "\",\"" +
            this.Products[i].independent_assessor.replace(/"/g, '""') + "\",\"" +
            this.Products[i].authorization + "\",\"" +
            this.Products[i].reuse + "\",\"" +
            ato[k].parent.replace(/"/g, '""') + "\",\"" +
            ato[k].sub.replace(/"/g, '""') + "\",\"" +
            ato[k].iss + "\",\"" +
            ato[k].auth + "\",\"" +
            ato[k].assess + "\",\"" +
            ato[k].exp + "\"" +
            "\r\n";
        }
      } else {

        csv += "\"" + this.Products[i].id.replace(/"/g, '""') + "\",\"" +
        this.Products[i].csp.replace(/"/g, '""') + "\",\"" +
        this.Products[i].cso.replace(/"/g, '""') + "\",\"" +
        this.Products[i].service_desc.replace(/"/g, '""').replace(/#/g, '%23') + "\",\"" +
        this.Products[i].business_function.join(',').replace(/"/g, '""') + "\",\"" +
        this.Products[i].service_model.join(',').replace(/"/g, '""') + "\",\"" +
        this.Products[i].status.replace(/"/g, '""') + "\",\"" +
        this.Products[i].independent_assessor.replace(/"/g, '""') + "\",\"" +
        this.Products[i].authorization + "\",\"" +
        this.Products[i].reuse + "\",\"" +
         "\",\"" + "\",\"" + "\",\"" + "\",\"" + "\",\"" + "\",\"" + "\"" +
        "\r\n";
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
    csvDownload.setAttribute("download", "marketplace-" + stamp + ".csv");

    document.body.appendChild(csvDownload);
    csvDownload.click();
    document.body.removeChild(csvDownload);

    this.atoLabel = "Export CSV Data";
    this.atoButtonDisabled = false;
  }

  getAtoDateArray(idProd: string) {

    let list: Array<{ label: string, parent: string, sub: string, iss: string, auth: string, assess: string, exp: string }> = [];

    let iss = "";
    let auth = "";
    let assess = "";
    let exp = "";

    // find initial
    for (var i = 0; i < this.AtoMapping.length; i++) {

      if (this.AtoMapping[i].id == idProd) {

        // these fall through to reuse
        auth = this.getDateTimeField(this.AtoMapping[i].auth_date);
        assess = this.reformatSomeDates(this.AtoMapping[i].assessment_date);

        iss = this.getDateTimeField(this.AtoMapping[i].ato_date);
        exp = this.getDateTimeField(this.AtoMapping[i].exp_date);

        if (iss != "" && exp == "") {
          exp = "Continuous ATO";
        }

        list.push({ label: "Initial", parent: this.AtoMapping[i].parent, sub: this.AtoMapping[i].sub, iss, auth, assess, exp });
        break;
      }
    }

    // find all reuse
    for (var i = 0; i < this.ReuseMapping.length; i++) {

      if (this.ReuseMapping[i].id == idProd) {

        iss = this.getDateTimeField(this.ReuseMapping[i].ato_date);
        exp = this.getDateTimeField(this.ReuseMapping[i].exp_date);

        if (iss != "" && exp == "") {
          exp = "Continuous ATO";
        }

        list.push({ label: "Reuse", parent: this.ReuseMapping[i].parent, sub: this.ReuseMapping[i].sub, iss, auth, assess, exp });
      }
    }

    return list;
  }

  // depending how the Apps Script feels, it either grabs the string 01/24 (which we want) or
  // a date 2024-01-24T20:00:00.000Z (which we can format into MM/DD)
  reformatSomeDates(inField: string) {
    return (inField.indexOf("T") == -1) ? inField : inField.slice(5, 7) + "/" + inField.slice(8, 10);
  }

  // slice the end of the date if it's present
  getDateTimeField(inField: string) {
    return (inField.indexOf("T") == -1) ? inField : inField.slice(0, inField.indexOf("T"));
  }

  zeroPad(n: number) {
    return n < 10 ? '0' + n : n
  }
}

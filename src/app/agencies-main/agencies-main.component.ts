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

  PARENT = true;
  SUB = false;
  atoLabel = "Export ATO Data"
  atoButtonDisabled = false;

  get isAtoDisabled(): boolean { 
    return this.atoButtonDisabled; 
  }

  csvFromAtoData() {

    this.atoLabel = "Downloading...";
    this.atoButtonDisabled = true;

    let csv = "data:text/csv;charset=utf-8,";
    let ato = "";
    let parentId = "";
    let subId = "";
    let agencyIndex = 0;

    // headers
    csv += "\"FedRAMP ID\",\"Cloud Service Provider\",\"Cloud Service Offering\",\"Service Description\",\"Business Categories\",\"Service Model\",\"Status\",\"Independent Assessor\",\"P ID\",\"Parent Agency\",\"S ID\",\"Sub Agency\",\"ATO\",\"ATO Issuance Date\",\"Authorization Date\",\"ATO Expiration Date\"\r\n";

    // for all products
    for (var i = 0; i < this.data.Products.length; i++) {

      // skip products that have one blank agency
      if (this.data.Products[i].status == "FedRAMP Authorized") {

        // for all agencies in a FedRAMP Authorized product
        for (var j = 0; j < this.data.Products[i].agency_authorizations.length; j++) {
          
          // if the agency isn't blank
          if(this.data.Products[i].agency_authorizations[j] != "") {

            parentId = this.getIdFromAgencyName(this.PARENT, this.data.Products[i].agency_authorizations[j]);
            subId = this.getIdFromAgencyName(this.SUB, this.data.Products[i].agency_authorizations[j]);

            agencyIndex = this.getCorrectAgencyIndex(subId == "", this.data.Products[i].agency_authorizations[j]);

            if (agencyIndex != -1) {

              ato = this.getAto(this.data.Products[i].id, parentId, subId);

              csv += "\"" + this.data.Products[i].id.replace(/"/g, '""') + "\",\"" +
                this.data.Products[i].csp.replace(/"/g, '""') + "\",\"" +
                this.data.Products[i].cso.replace(/"/g, '""') + "\",\"" +
                this.data.Products[i].service_desc.replace(/"/g, '""').replace(/#/g, '%23') + "\",\"" +
                this.data.Products[i].business_function.join(',').replace(/"/g, '""') + "\",\"" +
                this.data.Products[i].service_model.join(',').replace(/"/g, '""') + "\",\"" +
                this.data.Products[i].status.replace(/"/g, '""') + "\",\"" +
                this.data.Products[i].independent_assessor.replace(/"/g, '""') + "\",\"" +
                parentId + "\",\"" +
                this.data.Agencies[agencyIndex].parent.replace(/"/g, '""') + "\",\"" +
                subId + "\",\"" +
                this.data.Agencies[agencyIndex].sub.replace(/"/g, '""') + "\",\"" +
                ato + "\",\"" + // get ATOs from new data
                this.getAtoDates(ato, this.data.Products[i].id, parentId, subId) +
                "\r\n";
            }
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

    this.atoLabel = "Export ATO Data";
    this.atoButtonDisabled = false;
  }

  getCorrectAgencyIndex(isParent: boolean, inAgency: string) {

    for (let k = 0; k < this.data.Agencies.length; k++) {     

      if (isParent == true) {
        if (inAgency == this.data.Agencies[k].parent && this.data.Agencies[k].sub == "") {
          return k;
        }
      } else {
        if (inAgency == this.data.Agencies[k].sub) {
          return k;
        }
      }
    }
    return -1;
  }

  getIdFromAgencyName(isParent: boolean, inAgency: string) {

    for (var k = 0; k < this.data.Agencies.length; k++) {
      if (isParent == true) {
        if (inAgency == this.data.Agencies[k].parent && this.data.Agencies[k].sub == "") {
          return this.data.Agencies[k].id;
        }
      } else {
        if (inAgency == this.data.Agencies[k].sub) {
          return this.data.Agencies[k].sub_id;
        }
      }
    }
    return "";
  }

  getAto(idProd: string, parentId: string, subId: string) {
  
    for (var i = 0; i < this.data.ReuseMapping.length; i++) {
      if (this.data.ReuseMapping[i].id == idProd) {
        if (subId == "") {
          if (this.data.ReuseMapping[i].agency_id == parentId) {
            return "Reuse";
          }
        } else {
          if (this.data.ReuseMapping[i].sub_id == subId) {
            return "Reuse";
          }
        }
      }
    }
    return "Initial";
  }

  getAtoDates(ato: string, idProd: string, inParent: string, inSub: string) {

    let iss = "";
    let auth = "";
    let exp = "";

    if (ato == "Reuse") {

      for (var i = 0; i < this.data.ReuseMapping.length; i++) {

        if (this.data.ReuseMapping[i].id == idProd) {
          if (inSub != "") {
            if (inSub == this.data.ReuseMapping[i].sub_id) {
              iss = this.data.ReuseMapping[i].ato_date.slice(0,this.data.ReuseMapping[i].ato_date.indexOf("T"));
              auth = this.data.ReuseMapping[i].auth_date.slice(0,this.data.ReuseMapping[i].auth_date.indexOf("T"));
              exp = this.data.ReuseMapping[i].exp_date.slice(0,this.data.ReuseMapping[i].exp_date.indexOf("T"));
            }
          } else {
            if (inParent == this.data.ReuseMapping[i].agency_id) {
              iss = this.data.ReuseMapping[i].ato_date.slice(0,this.data.ReuseMapping[i].ato_date.indexOf("T"));
              auth = this.data.ReuseMapping[i].auth_date.slice(0,this.data.ReuseMapping[i].auth_date.indexOf("T"));
              exp = this.data.ReuseMapping[i].exp_date.slice(0,this.data.ReuseMapping[i].exp_date.indexOf("T"));
            }
          }
        }
      }

    } else {

      for (var i = 0; i < this.data.AtoMapping.length; i++) {

        
        if (this.data.AtoMapping[i].id == idProd 
        && (this.data.AtoMapping[i].agency_id == inParent || this.data.AtoMapping[i].agency_id == inSub)) {

          iss = this.data.AtoMapping[i].ato_date.slice(0,this.data.AtoMapping[i].ato_date.indexOf("T"));
          auth = this.data.AtoMapping[i].auth_date.slice(0,this.data.AtoMapping[i].auth_date.indexOf("T"));
          exp = this.data.AtoMapping[i].exp_date.slice(0,this.data.AtoMapping[i].exp_date.indexOf("T"));
        }
      }
    }
    
    if (iss != "" && exp == "") {
      exp = "Continuous ATO";
    }
    return iss + "\",\"" + auth + "\",\"" + exp + "\"";
  }


  zeroPad(n: number) {
    return n < 10 ? '0' + n : n
  }
}
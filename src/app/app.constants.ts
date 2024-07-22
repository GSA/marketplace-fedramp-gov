import { Injectable } from "@angular/core";

@Injectable()
export class AppConstants {
    readonly GIT_URL: string = 'https://raw.githubusercontent.com/GSA/marketplace-fedramp-gov-data/main/test.json';
    //testing signed commit
    //readonly GIT_URL: string = 'https://raw.githubusercontent.com/GSA/marketplace-fedramp-gov-data/main/data.json';
    readonly CACHE_DELAY: number = 1000;
    readonly CACHE_DATE_FORMAT: string = 'yyyy-MM-dd';
}

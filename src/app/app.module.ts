import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LinksComponent } from './links/links.component';
import { NavComponent } from './nav/nav.component';
import { RefreshDataComponent } from './refresh-data/refresh-data.component';
import { ProductsMainComponent } from './products-main/products-main.component';
import { AgenciesMainComponent } from './agencies-main/agencies-main.component';
import { AssessorsMainComponent } from './assessors-main/assessors-main.component';
import { FooterComponent } from './footer/footer.component';
import { TitleComponent } from './title/title.component';
import { AboutMarketplaceComponent } from './about-marketplace/about-marketplace.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { AgencyInfoComponent } from './agency-info/agency-info.component';
import { AssessorsInfoComponent } from './assessors-info/assessors-info.component';
import { HttpClientModule } from '@angular/common/http';

import { APP_INITIALIZER } from '@angular/core';
import { CacheFactory } from './cache-factory';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LinksComponent,
    NavComponent,
    RefreshDataComponent,
    ProductsMainComponent,
    AgenciesMainComponent,
    AssessorsMainComponent,
    FooterComponent,
    TitleComponent,
    AboutMarketplaceComponent,
    ProductInfoComponent,
    AgencyInfoComponent,
    AssessorsInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot ([
    
      { path: 'refresh', component: RefreshDataComponent },
      { path: 'products',  component: ProductsMainComponent },
      { path: 'assessors', component: AssessorsMainComponent },
      { path: 'agencies',  component: AgenciesMainComponent },
      { path: 'home',      component: HomeComponent },
    ])
  ],
  providers: [CacheFactory, DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: (cf: CacheFactory) => () => cf.init(),
      deps: [CacheFactory],
      multi: true
    }],
  bootstrap: [AppComponent]
})

export class AppModule {}


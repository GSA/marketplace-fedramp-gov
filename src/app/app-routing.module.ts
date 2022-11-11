import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyInfoComponent } from './agency-info/agency-info.component';
import { AssessorsInfoComponent } from './assessors-info/assessors-info.component';
import { ProductInfoComponent } from './product-info/product-info.component';

const routes: Routes = [
   {
    path: 'product-details/:id',
    component: ProductInfoComponent,
   },
   {
    path: 'assessors-details/:id',
    component: AssessorsInfoComponent,
   },
   {
    path: 'agencies-details/:id',
    component: AgencyInfoComponent,
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

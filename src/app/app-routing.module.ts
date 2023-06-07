import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyInfoComponent } from './agency-info/agency-info.component';
import { AssessorsInfoComponent } from './assessors-info/assessors-info.component';
import { ProductInfoComponent } from './product-info/product-info.component';

const routes: Routes = [
   {path: 'products/:id',    component: ProductInfoComponent },
   {path: 'assessors/:id',  component: AssessorsInfoComponent},
   {path: 'agencies/:id',   component: AgencyInfoComponent },
   {path: '', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})]
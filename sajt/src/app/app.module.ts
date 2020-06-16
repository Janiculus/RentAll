import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomePageComponent } from './home-page/home-page.component';
import {RouterModule, Routes} from '@angular/router';
import { ViewCategoryModule } from './view-category/view-category.module';
import { CategoryComponent } from './view-category/category/category.component';
import { ProductListComponent } from './view-category/category/product-list/product-list.component';
import { ProductDetailsComponent } from './view-category/category/product-details/product-details.component';
import { OfferComponent } from './offer/offer.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const productRoutes: Routes = [
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: ':id/products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword/products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: ':id', component: ProductListComponent},
  {path: '', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '**', redirectTo: '/category', pathMatch: 'full'}
]

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'user', component: UserComponent},
  {path: 'offer', component: OfferComponent},
  {path: 'category', component: CategoryComponent, children: productRoutes}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomePageComponent,
    OfferComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ViewCategoryModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomePageComponent } from './home-page/home-page.component';
import {RouterModule, Routes} from '@angular/router';
import { ViewCategoryModule } from './view-category/view-category.module';
import { CategoryComponent } from './view-category/category/category.component';
import { ProductListComponent } from './view-category/category/product-list/product-list.component';

const productRoutes: Routes = [
  {path: 'search/:keyword', component: ProductListComponent},
  {path: ':id', component: ProductListComponent},
  {path: '', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '**', redirectTo: '/category', pathMatch: 'full'}
]

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'user', component: UserComponent},
  {path: 'category', component: CategoryComponent, children: productRoutes}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ViewCategoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

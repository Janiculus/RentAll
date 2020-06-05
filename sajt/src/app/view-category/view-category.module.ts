import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { ProductService } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './category/product-list/product-list.component';
import {RouterModule} from "@angular/router";
import { ProductCategoryMenuComponent } from './category/product-category-menu/product-category-menu.component';
import { SearchComponent } from './category/search/search.component';
import { ProductDetailsComponent } from './category/product-details/product-details.component';


@NgModule({
  declarations: [
    CategoryComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule
    ],
  exports: [
    CategoryComponent,
    ProductListComponent
  ],
  providers: [ProductService]
})
export class ViewCategoryModule { }

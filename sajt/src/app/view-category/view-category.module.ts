import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { ProductService } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './category/product-list/product-list.component';


@NgModule({
  declarations: [
    CategoryComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CategoryComponent,
    ProductListComponent
  ],
  providers: [ProductService]
})
export class ViewCategoryModule { }

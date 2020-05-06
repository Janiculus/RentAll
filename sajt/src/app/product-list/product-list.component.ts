import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  // переменная - массив с продуктами который
  // будет хранить в себе все продукты с базы данных 
  products: Product[];

  // в конструктор добавил наш сервис ProductService
  constructor(private productService: ProductService) { }

  // добавил метод listProducts()
  ngOnInit(): void {
     this.listProducts();
  }

  listProducts() {
    // метод вызываеться как только дойдет до subscribe
    this.productService.getProductList().subscribe(
      data => {
        // присваиваем результат до нашего массива(Выше я его задекларировал)
        this.products = data 
      }
    )
  }

}

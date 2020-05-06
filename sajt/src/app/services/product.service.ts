import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    //  наши запросы до 'Products' спринг Бут запускает под данным аддрессом
    private baseUrl = 'http://localhost:8080/api/products';

    // inject HttpClient 
  constructor(private httpClient: HttpClient) { }

    // новый метод: Берет данные из бэка НО ОНИ ХРАНЯТЬСЯ В ФОРМАТЕ JSON
    // но с помощью интерфейса которого я настроил ниже
    // дата будет выводиться в нормальном формате
      getProductList(): Observable<Product[]> {
        return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
          map(response => response._embedded.products)
        );
      }
   }

   // Unwraps the JSON from Spring Data REST _embedded entry
   interface GetResponse {
     _embedded: {
       products: Product[];
     }
   }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
// import { ExternalProduct } from '../common/ExternalProduct';
import { Observable } from 'rxjs';
import  { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import {ExternalProduct} from '../common/ExternalProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product_category';

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {

    // URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number): Observable<GetResponseProducts> {


                          // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  searchExternalProduct(productNameFilter: string) {
    return this.httpClient.get<ExternalProduct[]>(`http://localhost:8080/api/externalProduct`).pipe(map(response => {
      return response;
    }));
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);

  }
// RESERVE PRODUCT
  reserveProduct(theProductId: number): Observable<any> {
    const reserveUrl = `${this.baseUrl}/${theProductId}`;
    const headers = {'content-type' : 'application/json'};
    const body = {active : 'false'};
    return this.httpClient.patch(reserveUrl, body, {headers: headers});
  }
// RETURN PRODUCT
  returnProduct(theProductId: number): Observable<any> {
    const returnUrl = `${this.baseUrl}/${theProductId}`;
    const headers = {'content-type' : 'application/json'};
    const body = {active : 'true'};
    return this.httpClient.patch(returnUrl, body, {headers: headers});
  }

  listProductsByOwner(userId: number, status: boolean): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/createdByUser/findByUserId?id=${userId}`;

    return this.getProducts(searchUrl);
  }

  listProductsByConsumer(userId: number, status: boolean): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/gotByUser/findByUserId?id=${userId}`;

    return this.getProducts(searchUrl);
  }

  addProduct(product: Product): Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(product);
    console.log(body);
    return this.httpClient.post(this.baseUrl, body, {headers: headers});
  }

  deleteProduct(theProductId: number): Observable<Product> {

    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.delete<Product>(productUrl);
  }

  updateProduct(product: Product): Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(product);
    console.log(body);
    return this.httpClient.put(this.baseUrl, body, {headers: headers});
  }

  searchCityProducts(cityName: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCityContaining/?city=${cityName}`;

    return this.getProducts(searchUrl);
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

interface GetResponseExternalProducts {
    products: ExternalProduct[];
}

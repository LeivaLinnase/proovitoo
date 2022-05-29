import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  rentProductsUrl = "https://t88riistarent-default-rtdb.europe-west1.firebasedatabase.app/rentproducts.json";
  cartChanged = new BehaviorSubject(true);
  constructor(private http: HttpClient) { }

  getProductsFromDb() {
  return this.http.get<Product[]>(this.rentProductsUrl);
  }

  addProductDb(newProduct: Product) {
    return this.http.post(this.rentProductsUrl, newProduct);
  }
  updateProductsInDb(updatedProducts: Product[]) {
    return this.http.put(this.rentProductsUrl, this.updateProductsInDb)
  }
}
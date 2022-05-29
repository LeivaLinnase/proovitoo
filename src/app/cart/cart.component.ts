import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CartProduct } from '../models/cart.product';
import { NgIf, NgIfContext } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  rentProducts: any[] = []
  cartProducts: any[] = [];
  
  totalPrice = 0;

  constructor(private http: HttpClient,
              private productService: ProductService) { }

  ngOnInit(): void {

    const cartItemsSS = sessionStorage.getItem("cartItems");
    if (cartItemsSS) {
      this.rentProducts = JSON.parse(cartItemsSS);
    }
    this.calculateTotal()
    
  }


  calculateTotal() {
    this.totalPrice = 0; 
    
    console.log
    let totalPrice = this.rentProducts.forEach
    (element => this.totalPrice = this.totalPrice + ((element.product.price)*0.075) * element.quantity);
   
    this.productService.cartChanged.next(true);
    
  
 }
 emptyCart() {
  this.rentProducts = [];
  sessionStorage.setItem("cartItems", JSON.stringify(this.rentProducts))
  this.calculateTotal();
  this.productService.cartChanged.next(true);

}

onDecreaseQuantity(rentProduct: CartProduct) {
  rentProduct.quantity--;
  if (rentProduct.quantity <= 0) {
    this.onRemoveProduct(rentProduct);
  }
  sessionStorage.setItem("cartItems", JSON.stringify(this.rentProducts))
  this.calculateTotal();
  this.productService.cartChanged.next(true);

}

onIncreaseQuantity(rentProduct: CartProduct) {
  rentProduct.quantity++;

  sessionStorage.setItem("cartItems", JSON.stringify(this.rentProducts))
  this.calculateTotal();
  this.productService.cartChanged.next(true);

}


onRemoveProduct(rentProduct: CartProduct) {
  const index = this.rentProducts.findIndex(element => element.product.id === rentProduct.product.id);
  if (index >= 0) {
  this.rentProducts.splice(index,1);
  if (this.rentProducts.length === 1 && this.rentProducts[0].product.id === 11110000) {
    
  }
  sessionStorage.setItem("cartItems", JSON.stringify(this.rentProducts));
  this.calculateTotal();
 }
 this.productService.cartChanged.next(true);
}

// toelineSumma(rentProduct: CartProduct) {
//     this.totalPrice = 0; 
    
//       if (rentProduct.product.price < 1500) {
//         let totalPrice = this.rentProducts.forEach
//       (element => this.totalPrice = this.totalPrice + ((element.product.price)*0.1) * element.quantity);
//       } else {
//         let totalPrice = this.rentProducts.forEach
//       (element => this.totalPrice = this.totalPrice + ((element.product.price)*0.05) * element.quantity);
//       }
//       this.productService.cartChanged.next(true);
//   }

}


  
    
    
  
    
    
    
    
  
 



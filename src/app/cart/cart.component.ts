import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { elementAt, from, Observable, Subject } from 'rxjs';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CartProduct } from '../models/cart.product';
import { NgIf, NgIfContext } from '@angular/common';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { numbers } from '@material/ripple';
import { fromJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { start } from '@popperjs/core';
import { DatepickerServiceInputs } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-service';
import { DatepickerViewModel } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { FormGroup, FormControl } from '@angular/forms';






@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  rentProducts: any[] = []
  cartProducts: any[] = [];
  
  
  totalPrice = 0;

  startDate: any;
  endDate: any;
  rentDays: number | undefined;
  
  

  

  


  constructor(private http: HttpClient,
              private productService: ProductService,
              private _toastService: ToastService) 
              { }

  ngOnInit(): void {

    const cartItemsSS = sessionStorage.getItem("cartItems");
    if (cartItemsSS) {
      this.rentProducts = JSON.parse(cartItemsSS);
    }
    this.calculateTotal()
    
    
  }


  calculateTotal() {
    this.totalPrice = 0; 
    
    
     

    let totalPrice = this.rentProducts.forEach
    (element => this.totalPrice = this.totalPrice +
       ((element.product.price)*0.07) 
      * element.quantity);
    
   
   
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

makse() {
  const makseAndmed = { 
    "api_username": "92ddcfab96e34a5f",
    "account_name": "EUR3D1",
    "amount": this.totalPrice,
    "order_reference": Math.random() * 893847,
    "nonce": "a9b7f7e79" + new Date() + Math.random() * 893847,
    "timestamp": new Date(),
    "customer_url": "https://riccardomasinad.web.app/"
   }

   const headers = {
    headers: new HttpHeaders(
      {
        "Authorization": 
        "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    )
  };
   this.http.post<any>("https://igw-demo.every-pay.com/api/v4/payments/oneoff", 
   makseAndmed, 
   headers).subscribe(tagastus => location.href = tagastus.payment_link);
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
onSubmitDate() {
  const date11 = this.startDate.replace('-', '');
  const date22 = this.endDate.replace('-', '');

  let date1 = date11.replace('-', '');
  let date2 = date22.replace('-', '');

  let diff = date2 - date1;

   this.rentDays = diff;


 

//  const date_1 = Date.parse(this.startDate);
//  const date_2 = Date.parse(this.endDate);

//  let diff = date_2 - date_1;
//  console.log(date_1, " ", date_2);

//  let uus = new Date(diff).toISOString();
//  console.log(uus)


}



}




  
    
    
  
    
    
    
    
  
 



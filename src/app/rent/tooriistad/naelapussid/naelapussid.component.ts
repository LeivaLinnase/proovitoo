import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { CartProduct } from 'src/app/models/cart.product';

@Component({
  selector: 'app-naelapussid',
  templateUrl: './naelapussid.component.html',
  styleUrls: ['./naelapussid.component.css']
})
export class NaelapussidComponent implements OnInit {
  naelapussid: {id: number, name: string, price: number, description: string, category: string, imgSrc: string, isActive: boolean}[] = [];
  products: Product[] = [];
  rentProducts: Product[] = [];
  dbUrl = "https://t88riistarent-default-rtdb.europe-west1.firebasedatabase.app/naelapüssid.json";

  constructor(private http: HttpClient,
              private productService: ProductService) { }

  ngOnInit(): void {

    this.http.get<{id: number, name: string, price: number, description: string, category: string, imgSrc: string, isActive: boolean}[]>(this.dbUrl).subscribe(productsFromDb => { 

      const newArray = [];
      for (const key in productsFromDb) {
        newArray.push(productsFromDb[key]);
      }
      this.naelapussid = newArray;
    }) ;
  }

  onAddToCart(productClicked: Product) {
    const cartItemsSS = sessionStorage.getItem("cartItems");
    let cartItems: CartProduct[] = [];
    if (cartItemsSS) {  //cartItemsSS !== null
      cartItems = JSON.parse(cartItemsSS);
    }
    const index = cartItems.findIndex(element => element.product.id === productClicked.id)
      if (index >= 0) {
      cartItems[index].quantity++;
      // ++  suurendan ennast 1 v6rra --> cartItems[index].quantity + 1
    }
    else {
        cartItems.push({ product: productClicked, quantity: 1 })
      }
      
    
    // enne kui pushin otsi yles kas sellist toodet juba on ostukorvi esemete hulgas
    // sulgude seest tuleva eseme id ---> product.id
    // otsin kas seda on cartItems seas ---> .findIndex(element => element.id === product.id)
    // kui ON, siis teen yhte loogikat
    // kui EI OLE, siis teen teist loogikat
    // if()  index >= 0 ---> suurendan kogust
    // else index === -1 ---> lisan ostukorvi .push abil 
     sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
     this.productService.cartChanged.next(true);
     
    //  this._toastService.info(productClicked.name + ' lisati ostukorvi');
     // info - sinine
     // sucess - roheline
     //error - punane
     //....
   
  }

}

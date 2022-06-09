import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { CartProduct } from 'src/app/models/cart.product';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-laserid',
  templateUrl: './laserid.component.html',
  styleUrls: ['./laserid.component.css']
})
export class LaseridComponent implements OnInit {
  laserid: {id: number, name: string, price: number, description: string, category: string, imgSrc: string, isActive: boolean}[] = [];
  products: Product[] = [];
  dbUrl = "https://t88riistarent-default-rtdb.europe-west1.firebasedatabase.app/laserid.json";
  rentProducts: Product[] = [];


  constructor(private http: HttpClient,
              private productService: ProductService,
              private _toastService: ToastService) { }

  ngOnInit(): void {

    this.http.get<{id: number, name: string, price: number, description: string, category: string, imgSrc: string, isActive: boolean}[]>(this.dbUrl).subscribe(productsFromDb => { 

      const newArray = [];
      for (const key in productsFromDb) {
        newArray.push(productsFromDb[key]);
      }
      this.laserid = newArray;
    }) ;

    this.productService.getProductsFromDb().subscribe(Response => {

      const newArray = [];
      for (const key in Response) {
        this.products.push(Response[key]);
        this.rentProducts.push(Response[key]);
      }
    })

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
      const parcelMachineIndex = cartItems.findIndex(element => element.product.id === 11110000);
      if(parcelMachineIndex >= 0) {
        cartItems.splice(parcelMachineIndex, 0,{product:productClicked, quantity: 1});

      } else {
        cartItems.push({ product: productClicked, quantity: 1 })
      }
      
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

  addInfoToast() {
    this._toastService.info('Lisatud rendikorvi');
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { stringify } from '@angular/compiler/src/util'; 

declare let Email: any;
import 'src/assets/smtp.js';



const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-asukohad',
  templateUrl: './asukohad.component.html',
  styleUrls: ['./asukohad.component.css']
})
export class AsukohadComponent implements OnInit, AfterViewInit, OnDestroy {
  muutuja: string = "lalalla"
  // kooloni abil n2itan tyypi
  // v6rdusm2rgi abil annan v22rtuse
  dbUrl = "https://riccardowebshop-default-rtdb.europe-west1.firebasedatabase.app/shops.json"
  shops: {shopName: string,
          latitude: number,
          longitude: number,
          openTimes: string}[] = [];

  //kui on kohene v22rtuse andmine, siis ei pea tyypi andma
  //...sest ta tunneb selle ise 2ra

  // :string, :number, :boolean

  private map: any;
  private lng = 59.434978716628265;
  private lat = 24.753164563627276;
  private zoom = 9;
  private marker!: L.Marker<any>;
  private marker2!: L.Marker<any>;
  private marker3!: L.Marker<any>;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.lng, this.lat ],
      zoom: this.zoom
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // this.marker = L.marker([59.42734250809111, 24.723175657230744]);
    // this.marker.addTo(this.map);
    // this.marker.bindPopup("<div>Kristiine keskus</div><br><div>Lahtioleku aeg: 9-19</div>");

    
    // this.marker2 = L.marker([59.4026539776488, 24.811400944071657])
    // this.marker2.addTo(this.map);
    // this.marker2.bindPopup("<div>Peetri Selver</div><br><div>Lahtioleku aeg: 9-22</div>");

    // this.marker3 = L.marker([59.47551258254086, 24.724490908370825])
    // this.marker3.addTo(this.map);
    // this.marker3.bindPopup("<div>Pikakari rand</div><br><div>Lahtioleku aeg: 24/7</div><br><div>Vanusepiirang: alates 5</div>");

    this.shops.forEach(element => {
      this.marker = L.marker([element.latitude, element.longitude]);
      this.marker.addTo(this.map);
      this.marker.bindPopup("<div>"+element.shopName+
      "</div><br><div>Lahtioleku aeg: "+
      element.openTimes+"</div>");
    })
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { 
    this.http.get<{shopName: string,
    latitude: number,
    longitude: number,
    openTimes: string}[]>(this.dbUrl).subscribe(shopsFromDb =>{
      const newArray = [];
      for (const key in shopsFromDb) {
        newArray.push(shopsFromDb[key]);
      }
      this.shops = newArray; 
      this.initMap();
    })
    
  } 

  onZoomShop(shopName: string) {

    // if (shopName === "kristiine") {
    //   this.map.setView(L.latLng([59.4295, 24.7224]),15);
    //   this.marker.openPopup();

    // }
    // else if (shopName === "pikakari") {
    //   this.map.setView(L.latLng([59.47551258254086, 24.724490908370825 ]),15);
    //   this.marker3.openPopup();
    // }
    // else if (shopName === "peetri") {
    //   this.map.setView(L.latLng([59.4026539776488, 24.811400944071657 ]),15);
    //   this.marker2.openPopup();
    // }
    // else {
    //   this.map.setView(L.latLng([59.43789239950658, 24.753314316848535 ]),9);
    //   this.marker.closePopup();
    //   this.marker2.closePopup();
    //   this.marker3.closePopup();
    // }
    
    const shopFound = this.shops.find(element => element.shopName === shopName);
    if (shopFound) {
      this.map.setView(L.latLng([shopFound.latitude, shopFound.longitude]), 15);
    } else {
      this.map.setView(L.latLng([59.4341, 24.7489]),11);
    }
  }
//   onSendEmail() {
//     Email.send({
//       Host : "smtp.elasticemail.com",
//       Username : "riccardokiho05@gmail.com",
//       Password : "C3AC2C8B6F4C7E9794F48D8F14D7F5491B30",
//       To : 'riccardokiho05@gmail.com',
//       From : "riccardokiho05@gmail.com",
//       Subject : "Korras",
//       Body : "K6ik toimib"
//       }).then(
//       (message: any) => alert(message)
// );
//   }
  ngOnDestroy()  { }  // funktsioon pannakse k2ima kui 2ra minnakse

}

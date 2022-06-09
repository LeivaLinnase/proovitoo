import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooriistadComponent } from './rent/tooriistad/tooriistad.component';
import { RasketehnikaComponent } from './rent/rasketehnika/rasketehnika.component';
import { TurvavarustusComponent } from './rent/turvavarustus/turvavarustus.component';
import { SaedComponent } from './rent/tooriistad/saed/saed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrellikomplektidComponent } from './rent/tooriistad/trellikomplektid/trellikomplektid.component';
import { NaelapussidComponent } from './rent/tooriistad/naelapussid/naelapussid.component';
import { LaseridComponent } from './rent/tooriistad/laserid/laserid.component';
import { KompressoridComponent } from './rent/tooriistad/kompressorid/kompressorid.component';
import { TellingudComponent } from './rent/tooriistad/tellingud/tellingud.component';
import { AkumutrikeerajadComponent } from './rent/tooriistad/akumutrikeerajad/akumutrikeerajad.component';
import { CartComponent } from './cart/cart.component';
import { AsukohadComponent } from './asukohad/asukohad.component';
import { HomeComponent } from './home/home.component';
import { MeistComponent } from './meist/meist.component';
import { YouTubePlayerModule } from '@angular/youtube-player';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TooriistadComponent,
    RasketehnikaComponent,
    TurvavarustusComponent,
    SaedComponent,
    TrellikomplektidComponent,
    NaelapussidComponent,
    LaseridComponent,
    KompressoridComponent,
    TellingudComponent,
    AkumutrikeerajadComponent,
    CartComponent,
    AsukohadComponent,
    HomeComponent,
    MeistComponent,
    
    

    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AngularToastifyModule,
    YouTubePlayerModule
    
  
    
    
    
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }




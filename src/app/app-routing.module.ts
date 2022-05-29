import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { RasketehnikaComponent } from './rent/rasketehnika/rasketehnika.component';
import { SaedComponent } from './rent/tooriistad/saed/saed.component';
import { TooriistadComponent } from './rent/tooriistad/tooriistad.component';
import { TurvavarustusComponent } from './rent/turvavarustus/turvavarustus.component';
import { AkumutrikeerajadComponent } from './rent/tooriistad/akumutrikeerajad/akumutrikeerajad.component';
import { KompressoridComponent } from './rent/tooriistad/kompressorid/kompressorid.component';
import { LaseridComponent } from './rent/tooriistad/laserid/laserid.component';
import { NaelapussidComponent } from './rent/tooriistad/naelapussid/naelapussid.component';
import { TellingudComponent } from './rent/tooriistad/tellingud/tellingud.component';
import { TrellikomplektidComponent } from './rent/tooriistad/trellikomplektid/trellikomplektid.component';
import { CartComponent } from './cart/cart.component';
import { AsukohadComponent } from './asukohad/asukohad.component';





const routes: Routes = [
  { path: "navbar", component: NavbarComponent  },
  { path: "tooriistad", component: TooriistadComponent },
  { path: "rasketehnika", component: RasketehnikaComponent },
  { path: "turvavarustus", component: TurvavarustusComponent },
  { path: "saed", component: SaedComponent },
  { path: "akumutrikeerajad", component: AkumutrikeerajadComponent },
  { path: "kompressorid", component: KompressoridComponent },
  { path: "laserid", component: LaseridComponent },
  { path: "naelapussid", component: NaelapussidComponent },
  { path: "tellingud", component: TellingudComponent },
  { path: "trellikomplektid", component: TrellikomplektidComponent },
  { path: "rendikorv", component: CartComponent },
  { path: "asukohad", component: AsukohadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

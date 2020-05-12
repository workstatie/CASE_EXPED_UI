import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/dashboard/main/main.component';
import { ValidateDataComponent } from './components/dashboard/validate-data/validate-data.component';
import { LoginComponent } from './components/login/login.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';



const routes: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: MainComponent, canActivate: [OktaAuthGuard]  },
  { path : 'login', component : OktaCallbackComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

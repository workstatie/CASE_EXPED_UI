import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/dashboard/main/main.component';
import { ValidateDataComponent } from './components/dashboard/validate-data/validate-data.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: MainComponent, canActivate: [ AuthGuardService ] },
  { path : 'login', component : LoginComponent},
  {path : 'x', component: ValidateDataComponent, outlet:'v'},
 // {path : 'welcome', component: SkypeInitComponent, outlet:"validation"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

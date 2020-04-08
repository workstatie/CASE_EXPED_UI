import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/dashboard/main/main.component';
import { ValidateDataComponent } from './components/dashboard/validate-data/validate-data.component';
import { SkypeInitComponent } from './components/dashboard/skype-init/skype-init.component';


const routes: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: MainComponent },

  {path : 'x', component: ValidateDataComponent, outlet:'v'},
 // {path : 'welcome', component: SkypeInitComponent, outlet:"validation"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

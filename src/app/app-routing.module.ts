import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MapComponent } from './pages/map/map.component';

const routes: Routes = [
  {
		path: '',
		component: MapComponent,
		pathMatch: 'full'
  },
  {
    path: 'loginpage',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

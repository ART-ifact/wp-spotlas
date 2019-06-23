import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MapComponent } from './pages/map/map.component';
import { GridComponent } from './pages/grid/grid.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: '/map',
		pathMatch: 'full'
  },
  {
    path: 'loginpage',
    component: LoginComponent
  },
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'map',
    component: MapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

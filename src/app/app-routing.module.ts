import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MapComponent } from './pages/map/map.component';
import { GridComponent } from './pages/grid/grid.component';
import { LocationComponent } from './pages/location/location.component';
import { AddLocationComponent } from './pages/add-location/add-location.component';
import { EditLocationComponent } from './pages/edit-location/edit-location.component';

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
  },
  {
    path: 'location/:id',
    component: LocationComponent
  },
  {
    path: 'add-location',
    component: AddLocationComponent
  },
  {
    path: 'edit/:id',
    component: EditLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

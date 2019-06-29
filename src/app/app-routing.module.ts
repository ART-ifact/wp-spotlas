import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MapComponent } from './pages/map/map.component';
import { GridComponent } from './pages/grid/grid.component';
import { LocationComponent } from './pages/location/location.component';
import { AddLocationComponent } from './pages/add-location/add-location.component';
import { EditLocationComponent } from './pages/edit-location/edit-location.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { UserlistComponent } from './pages/userlist/userlist.component';

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
    path: 'share/:id/:hash',
    component: LocationComponent
  },
  {
    path: 'add-location',
    component: AddLocationComponent
  },
  {
    path: 'edit/:id',
    component: EditLocationComponent
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent
  },
  {
    path: 'user/add',
    component: AddUserComponent
  },
  {
    path: 'userlist',
    component: UserlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

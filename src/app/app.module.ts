import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { MapComponent } from './pages/map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AgmJsMarkerClustererModule   } from '@agm/js-marker-clusterer';
import { MatCarouselModule } from '@ngmodule/material-carousel';
//Angular Material Components
import {MatCheckboxModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NonceInterceptor } from './services/nonce-interceptor';

import { PubSubModule } from 'angular7-pubsub';
import { GridComponent } from './pages/grid/grid.component';
import { AccessibilityComponent } from './components/accessibility/accessibility.component';
import { LocationComponent } from './pages/location/location.component';
import { CustomCheckboxComponent } from './components/custom-checkbox/custom-checkbox.component';
import { CustomLazyAPIKeyLoader } from './classes/map-api-loader';
import { AddLocationComponent } from './pages/add-location/add-location.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { GeoautofillComponent } from './components/geoautofill/geoautofill.component';
import { EditLocationComponent } from './pages/edit-location/edit-location.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { UserlistComponent } from './pages/userlist/userlist.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    GridComponent,
    AccessibilityComponent,
    LocationComponent,
    CustomCheckboxComponent,
    AddLocationComponent,
    FileInputComponent,
    GeoautofillComponent,
    EditLocationComponent,
    ConfirmationDialogComponent,
    UserProfileComponent,
    UserEditComponent,
    AddUserComponent,
    UserlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot(),
    PubSubModule.forRoot(),
    AgmSnazzyInfoWindowModule,
    AgmJsMarkerClustererModule,
    MatCarouselModule,
    FormsModule
    ],
    exports: [
      AccessibilityComponent,
      CustomCheckboxComponent,
      FileInputComponent,
      FormsModule,
      MatFormFieldModule
    ],
  providers: [
    { provide: MapsAPILoader, useClass: CustomLazyAPIKeyLoader },
    NonceInterceptor,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: NonceInterceptor,
        multi: true
      }
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

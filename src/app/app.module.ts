import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { AgmMarkerClustererModule } from '@agm/markerclusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
// Angular Material Components
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomLazyAPIKeyLoader } from './classes/map-api-loader';
import { AccessibilityComponent } from './components/accessibility/accessibility.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CustomCheckboxComponent } from './components/custom-checkbox/custom-checkbox.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { FilterComponent } from './components/filter/filter.component';
import { GeoautofillComponent } from './components/geoautofill/geoautofill.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CategoryPipe } from './helper/category.pipe';
import { LocationsPipe } from './helper/locations.pipe';
import { TypePipe } from './helper/type.pipe';
import { AddLocationComponent } from './pages/add-location/add-location.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditLocationComponent } from './pages/edit-location/edit-location.component';
import { GridComponent } from './pages/grid/grid.component';
import { LocationComponent } from './pages/location/location.component';
import { LoginComponent } from './pages/login/login.component';
import { MapComponent } from './pages/map/map.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { NonceInterceptor } from './services/nonce-interceptor';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



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
    UserlistComponent,
    LocationsPipe,
    FilterComponent,
    CategoryPipe,
    TypePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
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
    AgmSnazzyInfoWindowModule,
    AgmMarkerClustererModule,
    MatCarouselModule,
    FormsModule
    ],
    exports: [
      AccessibilityComponent,
      CustomCheckboxComponent,
      FileInputComponent,
      FormsModule,
      MatFormFieldModule,
      AgmCoreModule,
      CategoryPipe,
      TypePipe
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

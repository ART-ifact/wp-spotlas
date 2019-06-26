import { Component, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PubSubService } from 'angular7-pubsub';
import { UserService } from './services/user.service';
import { OptionsService } from './services/options.service';
import { Events } from './classes/enum/events.enum';
import { LocationsService } from './services/locations.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from './services/local-storage.service';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './services/auth.service';
import { StorageItems } from './classes/enum/storage-items.enum';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotlas-wp';
  public loginListener;
  constructor (
    private userService : UserService,
    private router: Router,
    private eventService : PubSubService,
    private optionService : OptionsService,
    private locationsService : LocationsService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private storage : LocalStorageService,
    private _renderer2: Renderer2,
    private authService : AuthService,
    @Inject(DOCUMENT) private _document: Document,
    ) {
      this.matIconRegistry.addSvgIcon(
        "rainy",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/rainy.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "cloudy",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/cloudy.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "foggy",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/foggy.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "sunny",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/sunny.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "spring",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/spring.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "summer",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/summer.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "winter",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/winter.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "autumn",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/autumn.svg")
      );
    }

  ngOnInit() {
    this.prepareIcons();
    this.prepareApplicationdata();
    this.loginListener = this.eventService.$sub(Events.LOGGEDIN, (from) => {
      this.prepareApplicationdata();
    });
  }

  prepareIcons() {

  }

  prepareApplicationdata() {
    this.userService.getUser().subscribe((res : any) => {
      if (res.data.status === 403) {
        this.router.navigate(['/loginpage'])
      } else {
        this.userService.userData = res;
        this.authService.updateNonces().subscribe((res : any) => {
          this.storage.setItem(StorageItems.mediaNonce, res.mediaNonce)
          this.storage.setItem(StorageItems.wpNonce, res.nonce)
        })
        this.optionService.getOptions().subscribe(response => {
          this.optionService.options = response;
          this.optionService.placesURL = "https://maps.google.com/maps/api/js?sensor=true&key="+this.optionService.options.apiKey+"&libraries=places&language=en-US";
        });
      }
    })
  }

  ngOnDestroy() {
    this.loginListener.unsubscribe();
  }
}

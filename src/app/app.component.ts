import { Component, Renderer2, Inject, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
import { MatSidenav, MatDrawer } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav', {static: false}) sidenav: MatDrawer ;
  title = 'spotlas-wp';
  public loginListener;
  public isAdmin : boolean = false;
  public hideMenu : boolean = false;

  constructor (
    public userService : UserService,
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
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd)  {
          //this.sidenav.close()
        }
      });
    }

  ngOnInit() {
    if (window.location.href.indexOf('/share/') > -1) {
      this.hideMenu = true;
      this.getOptions();
    } else {
      this.prepareApplicationdata();
    }
    this.loginListener = this.eventService.$sub(Events.LOGGEDIN, (from) => {
      this.prepareApplicationdata();
    });
  }

  getOptions() {
    this.optionService.getOptions().subscribe(response => {
      this.optionService.options = response;
      this.optionService.placesURL = "https://maps.google.com/maps/api/js?sensor=true&key="+this.optionService.options.apiKey+"&libraries=places&language=en-US";
    });
  }

  prepareApplicationdata() {
    this.userService.getMe().subscribe((res : any) => {
      console.log('getMe',res);
        this.getOptions();
        this.userService.userData = res;
        this.userService.currentUserID = res.id;
        this.authService.updateNonces().subscribe((res : any) => {
          this.storage.setItem(StorageItems.mediaNonce, res.mediaNonce)
          this.storage.setItem(StorageItems.wpNonce, res.nonce)
        })
        this.userService.isAdmin(res.id).subscribe((res : boolean) => {
          this.isAdmin = res;
        })
    })
  }

  ngOnDestroy() {
    this.loginListener.unsubscribe();
  }
}

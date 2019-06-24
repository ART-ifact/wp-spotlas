import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PubSubService } from 'angular7-pubsub';
import { UserService } from './services/user.service';
import { OptionsService } from './services/options.service';
import { Events } from './classes/enum/events.enum';
import { LocationsService } from './services/locations.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

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
      }
    })
    this.optionService.getOptions().subscribe(response => {
      this.optionService.options = response;
      this.eventService.$pub(Events.OPTIONSLOADED);
    });
    this.locationsService.getLocations().subscribe(response => {
      this.locationsService.locations = response;
    })
  }

  ngOnDestroy() {
    this.loginListener.unsubscribe();
  }
}

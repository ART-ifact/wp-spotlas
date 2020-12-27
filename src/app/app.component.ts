import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Events } from './classes/enum/events.enum';
import { AuthService } from './services/auth.service';
import { EventsService } from './services/events.service';
import { LocationsService } from './services/locations.service';
import { Options, OptionsService } from './services/options.service';
import { UiService } from './services/ui.service';
import { UpdateService } from './services/update.service';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotlas-wp';
  public loginListener;
  public currentUser;

  constructor(
    public userService: UserService,
    private router: Router,
    private eventService: EventsService,
    private optionService: OptionsService,
    private locationsService: LocationsService,
    public uiService: UiService,
    private authService: AuthService,
    private update: UpdateService,
    private translationService: TranslateService
    ) {
      this.uiService.prepareUIElements();
      this.router.events.subscribe((event: RouterEvent) => {
        this.update.checkForUpdates();
        if (event instanceof NavigationEnd) {
          this.authService.updateNonces().subscribe();
        }
      });
      this.optionService.getOptions().subscribe((options: Options) => {
        this.setupLanguage(options.language);
      });
    }

  ngOnInit() {
    if (!this.uiService.isSharedUrl()) {
      this.prepareApplicationdata();
    }
    this.loginListener = this.eventService.sub(Events.LOGGEDIN, (from) => {
      this.prepareApplicationdata();
    });
  }

  setupLanguage(useLanguage: string) {
    this.translationService.setDefaultLang('en');
    this.translationService.use(useLanguage);
  }

  prepareApplicationdata() {
    this.userService.getMe().subscribe(currentUser => {
      this.currentUser = currentUser;
      this.authService.updateNonces();
      this.locationsService.getLocations().subscribe();
    });
  }

  ngOnDestroy() {
    this.loginListener.unsubscribe();
  }
}

import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { OptionsService } from './services/options.service';
import { Events } from './classes/enum/events.enum';
import { LocalStorageService } from './services/local-storage.service';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './services/auth.service';
import { StorageItems } from './classes/enum/storage-items.enum';
import { EventsService } from './services/events.service';
import { UpdateService } from './services/update.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { UiService } from './services/ui.service';
import { LanguageService } from './services/language-service.service';
import { LocationsService } from './services/locations.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotlas-wp';
  public loginListener;
  public showFilter : boolean = false;

  constructor (
    public userService : UserService,
    private router: Router,
    private eventService : EventsService,
    private optionService : OptionsService,
    private locationsService : LocationsService,
    private storage : LocalStorageService,
    public uiService: UiService,
    private authService : AuthService,
    private update: UpdateService,
    public language: LanguageService,
    @Inject(DOCUMENT) private _document: Document,
    ) {
      this.uiService.prepareUIElements();
      this.router.events.subscribe(() => {
        this.update.checkForUpdates();
      });
      this.optionService.getOptions().subscribe()
    }

  ngOnInit() {
    if (!this.uiService.isSharedUrl()) {
      this.prepareApplicationdata();
    }
    this.loginListener = this.eventService.sub(Events.LOGGEDIN, (from) => {
      this.prepareApplicationdata();
    });
  }

  prepareApplicationdata() {
    this.userService.getMe().subscribe(() => {
      this.authService.updateNonces()
      this.locationsService.getLocations().subscribe()
    })
  }

  ngOnDestroy() {
    this.loginListener.unsubscribe();
  }
}

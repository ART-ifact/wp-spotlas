import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PubSubService } from 'angular7-pubsub';
import { UserService } from './services/user.service';
import { OptionsService } from './services/options.service';
import { Events } from './classes/enum/events.enum';
import { LocationsService } from './services/locations.service';

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
    private locationsService : LocationsService
    ) {}

  ngOnInit() {
    this.prepareApplicationdata();
    this.loginListener = this.eventService.$sub(Events.LOGGEDIN, (from) => {
      this.prepareApplicationdata();
    });
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from 'src/app/classes/enum/events.enum';
import { StorageItems } from 'src/app/classes/enum/storage-items.enum';
import { Logger } from 'src/app/helper/logger';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public username = '';
  public password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private eventService: EventsService,
    private storage: LocalStorageService
  ) { }

  ngOnInit() {
    this.storage.deleteItem(StorageItems.wpNonce);
    this.storage.deleteItem(StorageItems.mediaNonce);
    this.storage.deleteItem(StorageItems.logoutLink);
  }

  doLogin() {
    const loginForm = new FormData();
    loginForm.append('user_password', this.password);
    loginForm.append('user_login', this.username);
    this.authService.login(loginForm).subscribe((response: any) => {
      Logger.success('Login Successfull');
      this.authService.storeAuthenticationData(response);
      this.eventService.pub(Events.LOGGEDIN);
      this.router.navigate(['/']);
    });
  }

}

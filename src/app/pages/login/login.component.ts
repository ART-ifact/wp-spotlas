import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BasicRestService } from 'src/app/services/basic-rest.service';
import { Router } from '@angular/router';
import { Events } from 'src/app/classes/enum/events.enum';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { StorageItems } from 'src/app/classes/enum/storage-items.enum';
import { LanguageService } from 'src/app/services/language-service.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public username : string = '';
  public password : string = ''

  constructor(
    private authService : AuthService,
    private baseService : BasicRestService,
    private router : Router,
    private eventService : EventsService,
    private storage : LocalStorageService,
    public language : LanguageService
  ) { }

  ngOnInit() {
    this.storage.deleteItem(StorageItems.wpNonce);
    this.storage.deleteItem(StorageItems.mediaNonce);
    this.storage.deleteItem(StorageItems.logoutLink);
  }

  doLogin() {
    let loginForm = new FormData();
    loginForm.append('user_password', this.password);
    loginForm.append('user_login', this.username);
    this.authService.login(loginForm).subscribe((response : any) => {
      this.authService.nonce = response.nonce;
      this.authService.mediaNonce = response.mediaNonce;
      this.storage.setItem(StorageItems.logoutLink, response.logoutlink);
      this.storage.setItem(StorageItems.wpNonce, response.nonce);
      this.storage.setItem(StorageItems.mediaNonce, response.mediaNonce);
      this.eventService.pub(Events.LOGGEDIN);
      this.router.navigate(['/'])
    })
  }

}

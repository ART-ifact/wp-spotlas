import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BasicRestService } from 'src/app/services/basic-rest.service';
import { Router } from '@angular/router';
import { PubSubService } from 'angular7-pubsub';
import { Events } from 'src/app/classes/enum/events.enum';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
    private eventService : PubSubService,
    private storage : LocalStorageService
  ) { }

  ngOnInit() {
  }

  doLogin() {
    console.log(this.username, this.password)
    let loginForm = new FormData();
    loginForm.append('user_password', this.password);
    loginForm.append('user_login', this.username);
    this.authService.login(loginForm).subscribe((response : any) => {
      this.authService.nonce = response.nonce;
      this.authService.mediaNonce = response.mediaNonce;
      this.storage.setItem('NONCE', response.nonce);
      this.storage.setItem('MEDIANONCE', response.mediaNonce);
      this.eventService.$pub(Events.LOGGEDIN);
      this.router.navigate(['/'])
    })
  }

}

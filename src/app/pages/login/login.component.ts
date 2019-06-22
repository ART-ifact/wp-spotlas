import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { BasicRestService } from 'src/app/services/basic-rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public username : string = '';
  public password : string = ''

  constructor(private loginService : LoginService, private baseService : BasicRestService) { }

  ngOnInit() {
  }

  doLogin() {
    console.log(this.username, this.password)
    let loginForm = new FormData();
    loginForm.append('user_password', this.password);
    loginForm.append('user_login', this.username);
    this.loginService.login(loginForm).subscribe((response : any) => {
      this.loginService.nonce = response.nonce;
    })
  }

  getPostsTest() {
    this.baseService.get('wp/v2/posts?per_page=10000000').subscribe((res) => {
      console.log(res)
    })
  }

  getUser() {
    this.baseService.get('spotlas/user').subscribe((res) => {
      console.log(res)
    })
  }

  getOptions() {
    this.baseService.get('spotlas/options').subscribe((res) => {
      console.log(res)
    })
  }

}

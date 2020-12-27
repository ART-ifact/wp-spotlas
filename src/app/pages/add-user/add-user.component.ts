import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Helper } from 'src/app/helper/helper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public username: string;
  public mail: string;
  private form = {
    username: '',
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    nickname: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  saveUser() {
    this.form.username = this.username;
    this.form.email = this.mail;
    this.userService.addUser(Helper.buildUserForm(this.form, false)).subscribe(() => {
      this.snackBar.open(
        this.translate.instant('USER.ADDED'), '', {
        duration : 2000,
        panelClass: ['success']
      });
      this.router.navigate(['/userlist']);
    });
  }

  goBack() {
    this.location.back();
  }
}

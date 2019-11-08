import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Helper } from 'src/app/helper/helper';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LanguageService } from 'src/app/services/language-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public username;
  public mail;
  private form = {
    username: "",
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    nickname: "",
    password: ""
  }

  constructor(
    private userService : UserService,
    private _snackBar: MatSnackBar,
    private router : Router,
    public language : LanguageService,
    private _location : Location
  ) { }

  ngOnInit() {
  }

  saveUser() {
    this.form.username = this.username;
    this.form.email = this.mail;
    this.userService.addUser(Helper.buildUserForm(this.form, false)).subscribe(response => {
      this._snackBar.open('User added!','',{
        duration : 2000,
        panelClass: ['success']
      });
      this.router.navigate(['/userlist'])
    });
  }

  goBack() {
    this._location.back()
  }
}

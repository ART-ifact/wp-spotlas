import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { userData, UserService } from 'src/app/services/user.service';
import { Helper } from 'src/app/helper/helper';
import { Location } from '@angular/common';
import { LanguageService } from 'src/app/services/language-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Logger } from 'src/app/helper/logger';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  private id;
  public user : userData;
  public newpassword;
  public newpasswordrepeat;
  public loaded = false;
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
    private route : ActivatedRoute,
    private userService : UserService,
    private _snackBar: MatSnackBar,
    public language : LanguageService,
    private _location : Location,
    private router : Router
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
      this.getUser();
    })
  }

  goBack() {
    this._location.back()
  }

  getUser() {
    if (this.id) {
      this.userService.getUser(this.id).subscribe((user : userData) => {
        this.user = user;
      })
    } else {
      this.userService.getMe().subscribe((user: userData) => {
        this.user = user;
      })
    }

  }

  saveUser() {
    this.form.username = this.user.name;
    if (this.newpassword !== this.newpasswordrepeat) {
      console.log('password missmatch')
      this._snackBar.open('Passwords do mismatch','',{
        duration : 2000,
        panelClass: ['error']
      })
      return;
    } else {
      this.form.password = this.newpassword;
    }
    this.form.email = this.user.userEmail;
    this.userService.editUser(this.id, Helper.buildUserForm(this.form, true)).subscribe(
      () => {
        this._snackBar.open('Userprofile saved!','',{
          duration : 2000,
          panelClass: ['success']
        });

        this.router.navigateByUrl('/userlist')
      },
      (error) => {
        console.error(error)
        this._snackBar.open("Couldn't save user",'',{
          duration : 2000,
          panelClass: ['error']
        })
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Helper } from 'src/app/helper/helper';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  private id;
  public username : string  = '';
  public mail : string  = '';
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

  constructor(private route : ActivatedRoute, private userService : UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
      this.getUser();
    })
  }

  getUser() {
    this.userService.getUser().subscribe((user : any) => {
      this.username = user.name;
      this.mail = user.userEmail;
      this.loaded = true;
    })
  }

  saveUser() {
    this.form.username = this.username;
    if (this.newpassword !== this.newpasswordrepeat) {
      console.log('password missmatch')
      return;
    } else {
      this.form.password = this.newpassword;
    }
    this.form.email = this.mail;
    this.userService.editUser(this.id, Helper.buildUserForm(this.form, true)).subscribe(response => {
      this._snackBar.open('Userprofile saved!','',{
        duration : 2000,
        panelClass: ['success']
      })
    });
  }

}

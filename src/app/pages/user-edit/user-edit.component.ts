import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/classes/user.iface';
import { Helper } from 'src/app/helper/helper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  private id: number;
  public user: User;
  public newpassword: string;
  public newpasswordrepeat: string;
  public loaded = false;
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
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private translate: TranslateService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'));
      this.getUser();
    });
  }

  goBack() {
    this.location.back();
  }

  getUser() {
    if (this.id) {
      this.userService.getUser(this.id).subscribe((user: User) => {
        this.user = user;
      });
    } else {
      this.userService.getMe().subscribe((user: User) => {
        this.user = user;
      });
    }

  }

  saveUser() {
    this.form.username = this.user.name;
    if (this.newpassword !== this.newpasswordrepeat) {
      this.snackBar.open(this.translate.instant('USER.PASSWORD_MISMATCH'), '', {
        duration : 2000,
        panelClass: ['error']
      });
      return;
    } else {
      this.form.password = this.newpassword;
    }
    this.form.email = this.user.userEmail;
    this.userService.editUser(this.id, Helper.buildUserForm(this.form, true)).subscribe(
      () => {
        this.snackBar.open(this.translate.instant('USER.PROFILE_SAVED'), '', {
          duration : 2000,
          panelClass: ['success']
        });

        this.router.navigateByUrl('/userlist');
      },
      (error) => {
        this.snackBar.open(this.translate.instant('USER.SAVE_ERROR'), '', {
          duration : 2000,
          panelClass: ['error']
        });
      }
    );
  }

}

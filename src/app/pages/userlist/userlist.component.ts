import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { LanguageService } from 'src/app/services/language-service.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/classes/user.iface';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  public users : User[];

  constructor(
    public userService : UserService,
    public dialog: MatDialog,
    public language : LanguageService
  ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().subscribe((users : User[] ) => {
      this.users = users;
    })
  }

  openDeleteConfirmDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: "Do you really want to delete this user?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteUser(id)
      }
    });
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(res => {
      this.getUserList();
    });
  }

}

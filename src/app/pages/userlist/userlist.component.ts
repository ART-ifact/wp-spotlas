import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { LanguageService } from 'src/app/services/language-service.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  public users;

  constructor(
    public userService : UserService,
    public dialog: MatDialog,
    public language : LanguageService
  ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().subscribe((users : any ) => {
      console.log(users)
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
    console.log('user to delete', id)
    this.userService.deleteUser(id).subscribe(res => {
      this.getUserList();
    });
  }

}

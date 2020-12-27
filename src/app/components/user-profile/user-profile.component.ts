import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userName = 'Username';
  @Input() userId = 0;
  @Input() logoutLink = '';
  @Input() userImage: any = '';
  public avatar: any = '';
  constructor(public storage: LocalStorageService) { }

  ngOnInit() {
    this.avatar = this.userImage.avatar_urls[48];
  }

  ngOnViewInit() {

  }

}

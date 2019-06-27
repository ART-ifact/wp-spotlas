import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userName :string = 'Username';
  @Input() userId : number = 0;
  @Input() logoutLink : string = '';
  @Input() userImage : string = '';
  constructor(public storage : LocalStorageService) { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { flatten } from '@angular/compiler';
import { LanguageService } from 'src/app/services/language-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userName :string = 'Username';
  @Input() userId : number = 0;
  @Input() logoutLink : string = '';
  @Input() userImage : any = '';
  public avatar :any = '';
  constructor(public storage : LocalStorageService, public language : LanguageService) { }

  ngOnInit() {
    this.avatar = this.userImage.avatar_urls[48];
    console.log(this.avatar)
  }

  ngOnViewInit() {

  }

}

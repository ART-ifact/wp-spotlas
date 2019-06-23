import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userData;

  constructor(private baseService : BasicRestService) { }

  getUser() {
    return this.baseService.get('spotlas/user')
  }
}

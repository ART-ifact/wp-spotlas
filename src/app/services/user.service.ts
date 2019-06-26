import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userData;

  constructor(private baseService : BasicRestService) { }

  getUser() {
    return this.baseService.get(environment.api+'spotlas/user')
  }

  getNonce() {
    return this.baseService.get(environment.api+'spotlas/medianonce');
  }
}

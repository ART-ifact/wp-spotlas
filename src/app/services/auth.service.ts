import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public nonce : string = null;
  public mediaNonce : string = null;

  constructor(
    private baseService : BasicRestService
  ) { }

  login(data) {
    return this.baseService.post('spotlas/login', data);
  }

  getUser() {
    return this.baseService.get('spotlas/user')
  }
}

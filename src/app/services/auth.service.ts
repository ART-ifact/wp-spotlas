import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { environment } from 'src/environments/environment';
import { Logger } from '../helper/logger';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public nonce : string = null;
  public mediaNonce : string = null;

  constructor(
    private baseService : BasicRestService
  ) { }

  login(loginFormData) {
    return this.baseService.post(environment.api+'spotlas/login', loginFormData);
  }

  updateNonces() {
    return this.baseService.get(environment.api+'spotlas/nonces');
  }

  getUser() {
    return this.baseService.get(environment.api+'spotlas/user')
  }
}

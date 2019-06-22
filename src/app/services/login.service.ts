import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public nonce : string = null;

  constructor(
    private baseService : BasicRestService
  ) { }

  login(data) {
    return this.baseService.post('spotlas/login', data);
  }
}

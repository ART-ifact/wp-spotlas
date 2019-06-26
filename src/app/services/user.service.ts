import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from '../classes/enum/api-endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userData;

  constructor(private baseService : BasicRestService) { }

  getUser() {
    return this.baseService.get(ApiEndpoints.getUser)
  }

  getNonce() {
    return this.baseService.get(ApiEndpoints.getMediaNonce);
  }
}

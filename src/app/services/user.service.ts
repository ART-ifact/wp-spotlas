import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from '../classes/enum/api-endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userData;
  public currentUserID;

  constructor(private baseService : BasicRestService) { }

  getMe() {
    return this.baseService.get(ApiEndpoints.getMe)
  }

  getUser(id) {
    return this.baseService.get(ApiEndpoints.getUser + id)
  }

  getUsers() {
    return this.baseService.get(ApiEndpoints.getUsers)
  }

  isAdmin(id) {
    return this.baseService.get(ApiEndpoints.isAdmin);
  }

  getNonce() {
    return this.baseService.get(ApiEndpoints.getMediaNonce);
  }

  editUser(id, form) {
    return this.baseService.post(ApiEndpoints.editUser + id + '?force=true', form);
  }

  addUser(form) {
    return this.baseService.post(ApiEndpoints.addUser, form);
  }

  deleteUser(id) {
    return this.baseService.delete(ApiEndpoints.deleteUser + id + '?force=true&reassign=' + this.currentUserID);
  }
}

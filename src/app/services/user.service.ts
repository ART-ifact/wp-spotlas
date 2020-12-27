import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiEndpoints } from '../classes/enum/api-endpoints.enum';
import { User } from '../classes/user.iface';
import { BasicRestService } from './basic-rest.service';

export interface UserData {
  description: string;
  id: number;
  link: string;
  meta: object;
  name: string;
  slug: string;
  url: string;
  userEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserID: number;

  constructor(private baseService: BasicRestService) { }

  getMe() {
    return this.baseService.get(ApiEndpoints.getMe).pipe(
      map((userData: UserData) => {
        this.currentUserID = userData.id;
        return userData;
      })
    );
  }

  getUser(id: number) {
    return this.baseService.get(ApiEndpoints.getUser + id);
  }

  isCurrentUser(id: number) {
    return this.currentUserID === id;
  }

  getUsers(): Observable<User[]> {
    return this.baseService.get(ApiEndpoints.getUsers);
  }

  isAdmin() {
    return this.baseService.get(ApiEndpoints.isAdmin).pipe(
      map((isAdmin: boolean) => {
        return isAdmin;
      })
    );
  }

  getNonce() {
    return this.baseService.get(ApiEndpoints.getMediaNonce);
  }

  editUser(id: number, form: any) {
    return this.baseService.post(ApiEndpoints.editUser + id + '?force=true', form);
  }

  addUser(form: any) {
    return this.baseService.post(ApiEndpoints.addUser, form);
  }

  deleteUser(id: number) {
    return this.baseService.delete(ApiEndpoints.deleteUser + id + '?force=true&reassign=' + this.currentUserID);
  }
}

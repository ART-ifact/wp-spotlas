import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { environment } from 'src/environments/environment';
import { Logger } from '../helper/logger';
import { LocalStorageService } from './local-storage.service';
import { StorageItems } from '../classes/enum/storage-items.enum';
import { map } from 'rxjs/operators';

export interface authData {
  logoutlink: string,
  mediaNonce: string,
  nonce: string,
  user: number
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public nonce : string = null;
  public mediaNonce : string = null;

  constructor(
    private baseService : BasicRestService,
    private storage : LocalStorageService
  ) { }

  login(loginFormData) {
    return this.baseService.post(environment.api+'spotlas/login', loginFormData);
  }

  updateNonces() {
    return this.baseService.get(environment.api+'spotlas/nonces').pipe(
      map((nonces : any) => {
        this.nonce = nonces.nonce;
        this.mediaNonce = nonces.mediaNonce;
        this.storage.setItem(StorageItems.mediaNonce, nonces.mediaNonce)
        this.storage.setItem(StorageItems.wpNonce, nonces.nonce)
      })
    );
  }

  storeAuthenticationData(authenticationData:authData) {
    this.nonce = authenticationData.nonce;
    this.mediaNonce = authenticationData.mediaNonce;
    this.storage.setItem(StorageItems.logoutLink, authenticationData.logoutlink);
    this.storage.setItem(StorageItems.wpNonce, authenticationData.nonce);
    this.storage.setItem(StorageItems.mediaNonce, authenticationData.mediaNonce);
  }

  getUser() {
    return this.baseService.get(environment.api+'spotlas/user')
  }
}

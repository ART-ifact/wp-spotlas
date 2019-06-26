import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(name, value) {
    window.localStorage.setItem(name, value);
  }

  getItem(name) {
    return window.localStorage.getItem(name);
  }

  deleteItem(name) {
    localStorage.removeItem(name);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  sub(event, cb) {
    window.addEventListener(event, cb);
  }

  pub(event) {
    let newEvent = new CustomEvent(event, {});
    window.dispatchEvent(newEvent);
  }
}

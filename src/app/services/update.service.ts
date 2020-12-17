import { Injectable, isDevMode } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {


  constructor(public updates: SwUpdate, private _snackBar: MatSnackBar) {
    // If updates are enabled
    if (updates.isEnabled) {
      // poll the service worker to check for updates
      interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate());
    }
  }

  // Called from app.components.ts constructor
  public checkForUpdates() {
    if (this.updates.isEnabled) {
      this.updates.available.subscribe(event => {
        if(isDevMode()) console.log('current version is', event.current);
        if(isDevMode()) console.log('available version is', event.available);
        this.promptUser(event);
      });
      this.updates.activated.subscribe(event => {
        if(isDevMode()) console.log('old version was', event.previous);
        if(isDevMode()) console.log('new version is', event.current);
      });
    }
  }

  // If there is an update, promt the user
  private promptUser(e): void {
    if(e.available) {
      if(isDevMode()) console.log('new worker available')
      this.updates.activateUpdate().then(() => {
        let snackBarRef = this._snackBar.open('New Version available','Reload');
        snackBarRef.onAction().subscribe(()=> document.location.reload());
      });
    }
  }
}

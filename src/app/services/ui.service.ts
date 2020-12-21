import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private mediaMatcher: MediaMatcher
  ) {

  }

  prepareUIElements() {
    this.matIconRegistry.addSvgIcon(
      "rainy",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/rainy.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "cloudy",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/cloudy.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "foggy",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/foggy.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "sunny",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/sunny.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "spring",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/spring.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "summer",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/summer.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "winter",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/winter.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "autumn",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg-icons/autumn.svg")
    );
  }

  isSharedUrl() : boolean {
    return (window.location.href.indexOf('/share/') > -1);
  }

  hasBackdrop() {
    return this.mediaMatcher.matchMedia('(max-width: 960px)').matches
  }
}

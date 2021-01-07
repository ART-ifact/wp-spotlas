import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements OnInit {

  constructor() { }

  @Input() accessibility = 0;
  @Input() big = false;
  ngOnInit() {
  }

}

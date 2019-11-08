import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements OnInit {

  constructor() { }

  @Input() accessibility : number = 0;
  @Input() big : boolean = false;
  ngOnInit() {
  }

}

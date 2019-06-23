import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent implements OnInit {

  @Input() checked : boolean = false;
  @Input() iconName : string;
  @Input() readonly : boolean = false;
  @Input() name : string;

  constructor() { }

  ngOnInit() {
  }

  toggleCheckedState() {
    if (this.readonly) {
      return
    }
    this.checked = !this.checked;
  }

}

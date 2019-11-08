import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() change : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleCheckedState() {
    if (this.readonly) {
      return
    }
    this.checked = !this.checked;
    this.change.emit({value : this.checked});
  }

}

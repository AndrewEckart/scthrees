import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-container',
  templateUrl: './stat-container.component.html',
  styleUrls: ['./stat-container.component.scss']
})
export class StatContainerComponent implements OnInit {
  public numFormat = '1.0-0';

  @Input()
  set showDecimal(value: boolean) {
    this.numFormat = value ? '1.0-1' : '1.0-0';
  }

  @Input() public darkMode = false;
  @Input() public value: number;
  @Input() public label: string;

  constructor() { }

  ngOnInit() {
  }

}

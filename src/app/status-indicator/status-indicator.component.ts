import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.scss']
})
export class StatusIndicatorComponent implements OnInit {
  @Input() public live = false;
  @Input() public nextGame: string;

  constructor() { }

  ngOnInit() {
  }

}

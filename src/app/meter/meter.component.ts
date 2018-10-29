import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.scss']
})
export class MeterComponent implements OnInit {
  @Input() public label: string;
  @Input() public value: number;

  constructor() {
  }

  ngOnInit() {
  }

}

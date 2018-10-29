import {Component, Input, OnInit} from '@angular/core';
import {AppData} from '../models/appData';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() public data: AppData = new AppData();
  public pct;

  constructor() { }

  ngOnInit() {
  }

}

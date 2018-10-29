import {Component, Input, OnInit} from '@angular/core';
import {meterHeight} from '../animations/meter-height.animation';
import {NBA_RECORD_3PM} from '../constants';

@Component({
  selector: 'app-meter-container',
  templateUrl: './meter-container.component.html',
  styleUrls: ['./meter-container.component.scss'],
  animations: [
    meterHeight
  ]
})
export class MeterContainerComponent implements OnInit {
  private _record: number = NBA_RECORD_3PM;
  private _current = 0;

  @Input() set current(c: number) {
    this._current = c;
    this.calcHeights();
  }

  public recordAnim = {
    value: 'filled',
    params: {
      height: '100%',
      timings: '800ms ease-in-out'
    }
  };
  public currentAnim = {
    value: 'filled',
    params: {
      height: '50%',
      timings: '800ms 800ms ease-in-out'
    }
  };
  constructor() { }

  ngOnInit() {
    this.calcHeights();
  }

  calcHeights() {
    const max: number = Math.max(this._record, this._current);
    this.recordAnim = {
      value: 'filled',
      params: {
        height: this._record / max * 100 + '%',
        timings: '800ms ease-in-out'
      }
    };
    this.currentAnim = {
      value: 'filled',
      params: {
        height: this._current / max * 100 + '%',
        timings: '800ms 800ms ease-in-out'

      }
    };
  }

}

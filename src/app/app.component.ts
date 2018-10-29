import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AppData} from './models/appData';
import {AngularFireDatabase} from '@angular/fire/database';
import {NBA_RECORD_3PM} from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public record = NBA_RECORD_3PM;
  public data$: Observable<AppData>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.data$ = this.db.object('/').valueChanges() as Observable<AppData>;
  }
}

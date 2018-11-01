import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AppData} from './models/appData';
import {AngularFireDatabase} from '@angular/fire/database';
import {NBA_RECORD_3PM} from './constants';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {AngularFireFunctions} from '@angular/fire/functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public record = NBA_RECORD_3PM;
  public data$: Observable<AppData>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private fns: AngularFireFunctions
  ) {
  }

  ngOnInit(): void {
    this.data$ = this.db.object('/').valueChanges() as Observable<AppData>;
    this.fetchData();
    setInterval(this.fetchData.bind(this), 30000);
  }

  fetchData() {
    if (document.visibilityState === 'visible') {
      this.fns.httpsCallable('getData')({})
        .pipe(take(1))
        .subscribe();
    }
  }
}

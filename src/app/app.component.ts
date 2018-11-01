import {AfterViewInit, Component, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit {
  public record = NBA_RECORD_3PM;
  public data$: Observable<AppData>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private fns: AngularFireFunctions
  ) {
    const url = 'https://platform.twitter.com/widgets.js';
    if (!document.querySelector(`script[src='${url}']`)) {
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
    }
  }

  ngOnInit(): void {
    this.data$ = this.db.object('/').valueChanges() as Observable<AppData>;
    this.fetchData();
    setInterval(this.fetchData.bind(this), 30000);
  }

  ngAfterViewInit(): void {
    const d = document;
    const s = 'script';
    const id = 'twitter-wjs';
    let js: any;
    const fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  }

  fetchData() {
    if (document.visibilityState === 'visible') {
      this.fns.httpsCallable('getData')({})
        .pipe(take(1))
        .subscribe();
    }
  }
}

import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html'
})

export class TweetComponent implements AfterViewInit {
  @Input() url = '';
  @Input() text = '';

  constructor() {
    // load twitter sdk if required
    const url = 'https://platform.twitter.com/widgets.js';
    if (!document.querySelector(`script[src='${url}']`)) {
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
    }
  }

  ngAfterViewInit(): void {
    // render tweet button
    window['twttr'] && window['twttr'].widgets.load();
  }
}

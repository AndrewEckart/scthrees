import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FooterComponent} from './footer/footer.component';
import {StatsComponent} from './stats/stats.component';
import {StatContainerComponent} from './stat-container/stat-container.component';
import {MeterComponent} from './meter/meter.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MeterContainerComponent} from './meter-container/meter-container.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {LetDirective} from './directives/let.directive';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireFunctionsModule, FunctionsRegionToken} from '@angular/fire/functions';
import { StatusIndicatorComponent } from './status-indicator/status-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    StatsComponent,
    StatContainerComponent,
    MeterComponent,
    MeterContainerComponent,
    LetDirective,
    StatusIndicatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireFunctionsModule
  ],
  providers: [
    { provide: FunctionsRegionToken, useValue: 'us-central1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    StatsComponent,
    StatContainerComponent,
    MeterComponent,
    MeterContainerComponent,
    LetDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

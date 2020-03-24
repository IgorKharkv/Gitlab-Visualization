import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MergeRequestCardComponent} from './merge-request-card/merge-request-card.component';
import { TeamTabComponent } from './team-tab/team-tab.component';


@NgModule({
  declarations: [
    AppComponent,
    MergeRequestCardComponent,
    TeamTabComponent
  ],
  imports: [
    ScrollingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

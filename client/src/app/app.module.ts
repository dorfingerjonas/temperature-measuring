import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentTempComponent } from './components/current-temp/current-temp.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { HistoryComponent } from './components/history/history.component';
import { FormatDatePipe } from './pipes/FormatDatePipe';
import { FormatTemperaturePipe } from './pipes/FormatTempPipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

export function playerFactory(): any {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    CurrentTempComponent,
    HistoryComponent,
    FormatDatePipe,
    FormatTemperaturePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'temperature'),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    LottieModule.forRoot({player: playerFactory})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

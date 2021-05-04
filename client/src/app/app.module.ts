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
import { SettingsComponent } from './components/settings/settings.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ChartComponent } from './components/history/chart/chart.component';
import { MatSelectModule } from "@angular/material/select";

export function playerFactory(): any {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    CurrentTempComponent,
    HistoryComponent,
    FormatDatePipe,
    FormatTemperaturePipe,
    SettingsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'temperature'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    LottieModule.forRoot({player: playerFactory}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

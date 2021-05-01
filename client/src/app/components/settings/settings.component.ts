import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AnimationOptions } from 'ngx-lottie';
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  showLoading = true;
  isLoggedIn = false;
  pin?: number;
  interval?: number;
  options: AnimationOptions = {
    path: 'assets/animations/thermometer.json'
  };

  constructor(private db: AngularFireDatabase,
              private auth: AngularFireAuth,
              private location: Location,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.auth.authState.subscribe(state => {
      this.showLoading = false;
      this.isLoggedIn = !!state;
    });

    this.db.object('temperature/interval').valueChanges().subscribe(value => {
      const val: any = value;

      this.interval = parseFloat(val);
    });
  }

  isPinValid(): boolean {
    return !!(this.pin && this.pin.toString().length >= 6);
  }

  isIntervalValid(): boolean {
    return !!(this.interval);
  }

  login(): void {
    if (this.pin && this.isPinValid()) {
      this.auth.signInWithEmailAndPassword('temperature@dorfingerjonas.at', this.pin.toString()).catch(e => {
        switch (e.code) {
          case 'auth/wrong-password':
            this.snackBar.open('Ungültiger PIN','', {duration: 4000});
            break;
          default:
            this.snackBar.open('Es ist ein Fehler aufgetreten! Bitte versuchen Sie es später erneut.',
              '', {duration: 6000});
            break;
        }
      });
    }
  }

  logout(): void {
    this.auth.signOut();
  }

  saveInterval(): void {
    if (this.isIntervalValid()) {
      this.db.object('temperature/interval').set(this.interval).then(r => {
        this.snackBar.open('Intervall wurde gespeichert!', '', {duration: 4000});
      });
    }
  }

  back(): void {
    this.location.back();
  }
}

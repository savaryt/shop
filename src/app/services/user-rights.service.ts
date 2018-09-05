import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class UserRightsService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  isAdmin() {
    return this.auth.user;
    // return true;
  }
}

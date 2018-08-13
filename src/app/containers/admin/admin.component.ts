import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  tokenSub: Subscription;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tokenSub = this.fireauth.idTokenResult.subscribe(data => {
      if (data) {
        this.router.navigate(['dashboard'], { relativeTo: this.route });
      }
    });
  }
  ngOnDestroy() {
    this.tokenSub.unsubscribe();
  }

  signin() {
    this.fireauth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }


}

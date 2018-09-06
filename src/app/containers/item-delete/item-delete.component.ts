import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { FeedbackMessage } from '../../services/feedback-message.model';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html',
  styleUrls: ['./item-delete.component.scss']
})
export class ItemDeleteComponent implements OnInit {

  id: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private feedback: FeedbackService,
  ) { }

  ngOnInit() {
    this.id = this.route.params.pipe(map(({ id }) => id));
  }

  confirm() {
    this.route.params
      .pipe(map(({ sex, id }) => {
        const promise = this.firestore
          .collection('sex')
          .doc(sex)
          .collection('items')
          .doc(id)
          .delete()
          .then(() => {
            this.feedback.message.next(new FeedbackMessage('Item deleted'));
            this.router.navigate(['/items', sex])
          });
        return from(promise);
      }))
      .pipe(first())
      .subscribe()
  }

  cancel() {
    const link = this.route.parent.snapshot.pathFromRoot
      .map((({ url }) => url))
      .reduce((acc, curr) => [...acc, ...curr])
      .map(({ path }) => path);
    link.pop();
    this.router.navigate(link);
  }

}

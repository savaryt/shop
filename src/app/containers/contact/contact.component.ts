import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { first } from 'rxjs/operators';
import { FeedbackService } from '../../services/feedback.service';
import { FeedbackMessage } from '../../services/feedback-message.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private feedback: FeedbackService,
  ) {
    this.form = this.formBuilder.group({
      email: ['john.doe@gmail.com', Validators.required],
      subject: ['Wrong article', Validators.required],
      reference: ['#0000000000000001'],
      content: ['Hey, I received the wrong article for my first order...', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const { email, subject, reference, content } = this.form.value;
    console.log(this.form.value);
    this.feedback.message.next(new FeedbackMessage('Contact not available for now !'));

    // External network isn't accessible on firebase free hosting 

    // this.http.post(`${environment.functions.root}nodeMailer`, { email, subject, reference, content })
    //   .pipe(first())
    //   .subscribe(
    //     ({ message }: { message }) => {
    //       if (message === 'success') {
    //         this.feedback.message.next(new FeedbackMessage('Message sent'));
    //       }
    //     },
    //     (error) => {
    //       this.feedback.message.next(new FeedbackMessage('Message couldn\'t be sent'));
    //       console.error('error');
    //     }
    //   );
  }

}

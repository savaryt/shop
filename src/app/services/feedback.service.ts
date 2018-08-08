import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FeedbackMessage } from './feedback-message.model';



@Injectable({
  providedIn: 'root'
})
export class FeedbackService {


  message = new Subject<FeedbackMessage>();

  constructor() { }
}

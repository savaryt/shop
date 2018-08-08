import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackMessage } from '../services/feedback-message.model';
import { Store } from '@ngrx/store';
import { selectAll } from '../item/item.reducer';
import { IItem } from '../item/item.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  account: FormGroup;
  shipping: FormGroup;
  payment: FormGroup;

  constructor(
    private store: Store<IItem>,
    private formBuilder: FormBuilder,
    private feedback: FeedbackService,
  ) { }

  ngOnInit() {

    this.account = this.formBuilder.group({
      email: ['john.doe@gmail.com', Validators.compose([Validators.required, Validators.email])],
      phone: ['076 000 00 00', Validators.required],
    });

    this.shipping = this.formBuilder.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      street: ['Avenue du Lignon 85', Validators.required],
      city: ['Le Lignon', Validators.required],
      state: ['Genève', Validators.required],
      zip: ['1219', Validators.required],
    });

    this.payment = this.formBuilder.group({
      cardHolder: ['John Doe', Validators.required],
      cardNumber: ['4242', Validators.required],
      expiry: this.formBuilder.group({
        month: ['12', Validators.required],
        year: ['2018', Validators.required],
        cvv: ['12121212', Validators.required],
      })
    });
  }

  proceed() {
    const order = this.store.select(selectAll)
      .subscribe((state) => {
        const usefulState = state.map((item) => {
          const parts = item.id.split('-');
          const id = parts[0];
          const size = parts[1];
          return { id, size, quantity: item.quantity };
        })
        const data = { account: this.account.value, shipping: this.shipping.value, payment: this.payment.value, order: usefulState };
        console.log(data);
        this.feedback.message.next(new FeedbackMessage('Payment not implemented yet !'));
      });
  }

}
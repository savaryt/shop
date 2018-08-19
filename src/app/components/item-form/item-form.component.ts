import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { throttleTime } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  form: FormGroup;
  @Output() valueChange = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      price: ['', Validators.required],
      sale: ['', Validators.required],
      label: ['', Validators.required],
      description: ['', Validators.required],
    });



    this.form.valueChanges
      .pipe(throttleTime(250))
      .subscribe(value => {
        const createdAt = Date.now(), updatedAt = Date.now();
        this.valueChange.emit({
          value: { createdAt, updatedAt, ...value },
          valid: this.form.valid
        });
      });
  }


}

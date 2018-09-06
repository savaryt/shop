import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { throttleTime, startWith } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  form: FormGroup;
  @Input() set value(value: any) {
    if (this.form && value) {
      this.form.setValue(value);
      this.valueChange.emit({ value: this.form.value, valid: this.form.valid });
    }
  }
  @Input() sexDisabled = false;
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
      sex: ['', Validators.required],
    });



    this.form.valueChanges
      .pipe(startWith({ value: { ...this.form.value, updatedAt: Date.now(), createdAt: Date.now() }, valid: this.form.valid }))
      .pipe(throttleTime(250))
      .subscribe(() => {
        const createdAt = Date.now(), updatedAt = Date.now();
        this.valueChange.emit({
          value: { createdAt, updatedAt, ...this.form.value },
          valid: this.form.valid
        });
      });
  }


}

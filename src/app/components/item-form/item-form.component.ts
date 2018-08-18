import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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



    this.form.valueChanges.subscribe(value => {
      const createdAt = Date.now(), updatedAt = Date.now();
      if (this.form.valid) {
        this.valueChange.emit({ createdAt, updatedAt, ...value });
      }
    });
  }


}

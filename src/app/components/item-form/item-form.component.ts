import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { throttleTime, startWith } from '../../../../node_modules/rxjs/operators';

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
      price: ['34.90', Validators.required],
      sale: ['5', Validators.required],
      label: ['Branded Tshirt', Validators.required],
      description: ['Wash: 30°C\nMaterial: Cotton\nOccasion: Relax', Validators.required],
      sex: ['men', Validators.required],
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

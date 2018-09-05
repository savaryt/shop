import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validators, FormControl } from '@angular/forms';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SizeInputComponent),
      multi: true,
    }
  ],
  selector: 'app-size-input',
  templateUrl: './size-input.component.html',
  styleUrls: ['./size-input.component.scss']
})
export class SizeInputComponent implements ControlValueAccessor {

  label: FormControl;
  stock: FormControl;

  private _value: { label: string, stock: number };
  set value(value: { label: string, stock: number }) {
    if (value) {
      this.writeValue(value);
      this.onChange(value);
    }
  }
  get value(): { label: string, stock: number } {
    return this._value;
  }
  onChange = (_: any) => { };
  onTouched = (_: any) => { };

  constructor() {
    this.value = { label: null, stock: null };

    this.label = new FormControl(this.value.label, [Validators.required]);
    this.stock = new FormControl(this.value.stock, [Validators.required]);
  }

  writeValue(value: any): void {
    this._value = value;
    if (this.label && this.stock) {
      this.label.setValue(value.label);
      this.stock.setValue(value.stock);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  labelChange($event) {
    this.value.label = $event.target.value;
    this.onChange(this.value);
  }
  stockChange($event) {
    this.value.stock = $event.target.valueAsNumber;
    this.onChange(this.value);
  }
}

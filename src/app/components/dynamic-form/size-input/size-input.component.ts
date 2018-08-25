import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  }

  writeValue(value: any): void {
    this._value = value;
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
    this.value.stock = $event.target.value;
    this.onChange(this.value);
  }
}

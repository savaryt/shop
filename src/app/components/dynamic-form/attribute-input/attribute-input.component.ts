import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttributeInputComponent),
      multi: true,
    }
  ],
  selector: 'app-attribute-input',
  templateUrl: './attribute-input.component.html',
  styleUrls: ['./attribute-input.component.scss']
})
export class AttributeInputComponent implements ControlValueAccessor {
  private _value: { label: string, color: string };
  set value(value: { label: string, color: string }) {
    if (value) {
      this.writeValue(value);
      this.onChange(value);
    }
  }
  get value(): { label: string, color: string } {
    return this._value;
  }
  onChange = (_: any) => { };
  onTouched = (_: any) => { };

  constructor() {
    this.value = { label: null, color: null };
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
  colorChange($event) {
    this.value.color = $event.target.value;
    this.onChange(this.value);
  }

}

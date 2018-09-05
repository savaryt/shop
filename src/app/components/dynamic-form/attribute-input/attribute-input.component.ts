import { Component, forwardRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, NG_VALIDATORS, FormControl, Validators } from '@angular/forms';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttributeInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AttributeInputComponent),
      multi: true,
    }
  ],
  selector: 'app-attribute-input',
  templateUrl: './attribute-input.component.html',
  styleUrls: ['./attribute-input.component.scss']
})
export class AttributeInputComponent implements ControlValueAccessor, Validator {

  previousClasses: string[];
  label: FormControl;
  color: FormControl;

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
    this.label = new FormControl(this.value.label, [Validators.required]);
    this.color = new FormControl(this.value.color, [Validators.required]);
  }

  writeValue(value: any): void {
    this._value = value;
    if (this.label && this.color) {
      this.label.setValue(value.label);
      this.color.setValue(value.color);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl) {
    if (this.value.label && this.value.color) {
      return null;
    }
    return { requiredError: { valid: false } };
  }

  labelChange($event) {
    this.value.label = $event.target.value;
    this.label.setValue($event.target.value);
    this.onChange(this.value);
  }
  colorChange($event) {
    this.value.color = $event.value;
    this.color.setValue($event.value);
    this.onChange(this.value);
  }

}

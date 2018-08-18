import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR, FormGroup, ControlValueAccessor } from '@angular/forms';

import { Field } from '../dynamic-field/field.interface';
import { FieldConfig } from '../dynamic-field/field-config.interface';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormImageInputComponent),
  }],
  selector: 'app-form-image-input',
  templateUrl: './form-image-input.component.html',
  styleUrls: ['./form-image-input.component.scss']
})
export class FormImageInputComponent implements Field, ControlValueAccessor {
  config: FieldConfig;
  group: FormGroup;

  @Input() public placeholder: string;

  @Output() public imageChange = new EventEmitter();

  public dataUrl: SafeResourceUrl;
  public imageData: { blob: Blob, name: string };

  // ControlValueAccessor implementation
  private _image: { base64: string, name: string };
  public get image(): { base64: string, name: string } {
    return this._image;
  }
  public set image(image: { base64: string, name: string }) {
    if (image) {
      this.writeValue(image);
      this._onChangeCallback(image);
    }
  }
  public writeValue(image: { base64: string, name: string }): void {
    this._image = image;
    if (image) {
      this._getMetadata(image);
    }
  }
  public registerOnChange(fn: any): void { this._onChangeCallback = fn; }
  public registerOnTouched(fn: any): void { this._onTouchCallback = fn; }
  public _onChangeCallback: (_: { base64: string, name: string }) => void = () => { };
  public _onTouchCallback: () => void = () => { };

  constructor(
    private _domSanitizer: DomSanitizer,
  ) { }

  public onImageChange(event: ProgressEvent) {
    const { target } = event;
    const { files } = target as HTMLInputElement;

    const reader = new FileReader();
    new Promise((resolve, reject) => {
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const pic = { base64: reader.result, name: 'picture' };
        resolve(pic);
      };
    })
      .then((image: { base64, name }) => {
        this.image = image;
        this.imageData = image.base64;
      });

  }

  private _getMetadata(image: { base64: string, name: string }) {
    this.dataUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(image.base64);
  }
}

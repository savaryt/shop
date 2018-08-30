import { Component, SimpleChange, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';

import { Field } from '../dynamic-field/field.interface';
import { FieldConfig } from '../dynamic-field/field-config.interface';

@Component({
  selector: 'app-form-image-input',
  templateUrl: './form-image-input.component.html',
  styleUrls: ['./form-image-input.component.scss']
})
export class FormImageInputComponent implements Field, OnChanges, OnInit {
  config: FieldConfig;
  group: FormGroup;
  url: string;

  constructor() { }

  onImageChange(event: ProgressEvent) {
    const { target } = event;
    const { files } = target as HTMLInputElement;

    const reader = new FileReader();
    new Promise((resolve, reject) => {
      if (files[0]) {
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          const image = { src: reader.result, alt: files[0].name };
          this.url = image.src as string;
          resolve(image);
        };
      } else {
        reject(null);
      }
    })
      .then((image: { src, alt }) => {
        this.group.get(this.config.name).setValue(image);
      })
      .catch(() => { });
  }
  ngOnInit() {
    if (this.group.get(this.config.name).value) {
      this.url = this.group.get(this.config.name).value.src;
    }
  }

  ngOnChanges() {

  }

}

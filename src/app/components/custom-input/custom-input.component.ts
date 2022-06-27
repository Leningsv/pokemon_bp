import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { InputType } from '../../utils/application.type';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {
  @Input()
  public customControl: FormControl | AbstractControl;
  @Input()
  public placeholder: string;
  @Input()
  public inputType: InputType;
  @Input()
  public label: string;
  @Input()
  public maxLength: number;

  constructor() {
    this.placeholder = '';
    this.inputType = 'text';
    this.label = '';
    this.maxLength = 50;
  }

  ngOnInit(): void {
  }

}

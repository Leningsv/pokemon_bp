import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {
  @Input()
  public limitLength: number;
  private _regexOnlyNumbers: RegExp;
  private _whiteListKeys: string[];

  constructor(private _el: ElementRef) {
    this.limitLength = 3;
  }

  ngOnInit(): void {
    this._regexOnlyNumbers = new RegExp(/[0-9]/);
    this._whiteListKeys = ['Backspace', 'ArrowRight', 'ArrowLeft', 'Delete', 'Tab', 'Meta', 'Control'];
  }

  @HostListener('keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent): void {
    if (this._whiteListKeys.find(x => x === event.key)) {
      return;
    }
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    if (!event.key || !this._regexOnlyNumbers.test(event.key)) {
      event.preventDefault();
    }
    if (this._el.nativeElement.value.length >= this.limitLength) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  public blockPaste(e: ClipboardEvent): void {
    if (!this._regexOnlyNumbers.test(e?.clipboardData?.getData('Text'))) {
      e.preventDefault();
    }
  }

}

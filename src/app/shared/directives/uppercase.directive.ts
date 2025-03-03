import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
})
export class UppercaseDirective implements AfterViewInit {
  constructor(private el: ElementRef, private control: NgControl) {}

  ngAfterViewInit() {
    this.toUppercase();
  }

  @HostListener('input', ['$event']) onInput() {
    this.toUppercase();
  }

  private toUppercase() {
    const input = this.el.nativeElement as HTMLInputElement;
    const uppercaseValue = input.value.toUpperCase();
    if (this.control.control) {
      this.control.control.setValue(uppercaseValue, { emitEvent: false });
    }
    input.value = uppercaseValue;
  }
}

import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appUppercase]',
})
export class UppercaseDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.toUppercase();
  }

  @HostListener('input', ['$event']) onInput(event: Event) {
    this.toUppercase();
  }

  private toUppercase() {
    const input = this.el.nativeElement as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }
}

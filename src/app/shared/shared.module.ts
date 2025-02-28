import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule({
  declarations: [UppercaseDirective],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    UppercaseDirective,
  ],
})
export class SharedModule {}

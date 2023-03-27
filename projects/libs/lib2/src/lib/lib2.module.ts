import { NgModule } from '@angular/core';
import { Lib2Component } from './lib2.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    Lib2Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Lib2Component
  ]
})
export class Lib2Module { }

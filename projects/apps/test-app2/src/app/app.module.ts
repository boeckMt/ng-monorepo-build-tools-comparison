import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Lib3Module } from '@libs/lib3';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Lib3Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

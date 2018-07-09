import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { SearchComponent } from './searchGit/searchGit.component'


import { SearchService } from './services/search.service'








@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    SearchService,
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

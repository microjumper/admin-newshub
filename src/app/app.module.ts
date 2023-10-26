import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";


import { ButtonModule}  from "primeng/button";
import { EditableRow, TableModule} from "primeng/table";
import { RippleModule } from "primeng/ripple";
import { InputTextareaModule } from "primeng/inputtextarea";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule
  ],
  providers: [EditableRow],
  bootstrap: [AppComponent]
})
export class AppModule { }

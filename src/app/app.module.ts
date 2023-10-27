import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { ButtonModule }  from "primeng/button";
import { EditableRow, TableModule} from "primeng/table";
import { RippleModule } from "primeng/ripple";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CardModule } from "primeng/card";
import { ToolbarModule } from "primeng/toolbar";
import { InputTextModule } from "primeng/inputtext";
import { MenuModule } from "primeng/menu";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleComponent } from './components/article/article.component';
import {KeyFilterModule} from "primeng/keyfilter";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    CardModule,
    ReactiveFormsModule,
    ToolbarModule,
    MenuModule,
    KeyFilterModule
  ],
  providers: [EditableRow],
  bootstrap: [AppComponent]
})
export class AppModule { }

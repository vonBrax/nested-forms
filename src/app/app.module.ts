import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { 
  MdAutocompleteModule,
  MdInputModule,
  MdButtonModule } from '@angular/material';


import { AppComponent } from './app.component';
import { FormParentComponent } from './components/form-parent/form-parent.component';
import { FormChildComponent } from './components/form-child/form-child.component';

@NgModule({
  declarations: [
    AppComponent,
    FormParentComponent,
    FormChildComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdAutocompleteModule,
    MdInputModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

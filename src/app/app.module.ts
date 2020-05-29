import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { OneComponent } from './main/one/one.component';
import { TwoComponent } from './main/two/two.component';
import { ThreeComponent } from './main/three/three.component';
import { FourComponent } from './main/four/four.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent,
    FourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

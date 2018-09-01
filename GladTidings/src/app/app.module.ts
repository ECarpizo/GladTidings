import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

/* Modules */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { FormsModule } from '@angular/forms';

/* Services */
import { UserService } from './services/user.service';
import { BaseUrlService } from './services/base-url.service';

/* Code for importing new components to app.module:
ng generate module app-routing --flat --module=app 
--flat puts the file in src/app instead of its own folder.
--module=app tells the CLI to register it in the imports array of the AppModule.
*/
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
    SlimLoadingBarModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [BaseUrlService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

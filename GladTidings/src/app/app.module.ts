/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatProgressBarModule,
  MatPaginatorModule
} from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';


/*Directives*/
import { ScreenWidthDirective } from './directives/screen-width.directive';

/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';

/* Services */
import { BaseUrlService } from './services/base-url.service';
import { UtilityService } from './services/utility.service';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';
import { CategoryService } from './services/category.service';
import { SettingsComponent } from './settings/settings.component';

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
    PostComponent,
    ScreenWidthDirective,
    BlogComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    CommonModule,
    SlimLoadingBarModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MatProgressBarModule,
    MatPaginatorModule,
  ],
  providers: [
    BaseUrlService, 
    UserService, 
    UtilityService, 
    PostService, 
    CommentService, 
    CategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { BlogComponent } from "./blog/blog.component";
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [
  // if the user types in just the base url, they will be redirected to the path specified below.
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'blog', component: BlogComponent },
  //{ path: 'resources', component: ResourcesAndWorksheetsComponent },
  { path: 'login', component: LoginComponent },
  // if the user tries to go to a url that is not specified here in the routes,
  // the app will redirect the user to the home component
  { path: 'blog', component: BlogComponent},
  { path: "settings", component: SettingsComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

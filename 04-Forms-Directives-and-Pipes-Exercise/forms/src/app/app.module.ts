import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { MustMatchDirective } from './shared/must-match.directive';

import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './services/authentication.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

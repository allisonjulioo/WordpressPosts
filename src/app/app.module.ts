import { environment } from './../environments/environment';
import { ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostPageComponent } from './post-page/post-page.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';

import { NgxEditorModule } from 'ngx-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PostsComponent } from './posts/posts.component';


import {  MatToolbarModule, 
          MatButtonModule, 
          MatSidenavModule, 
          MatIconModule, 
          MatListModule, 
          MatGridListModule,
          MatCardModule, 
          MatMenuModule,
          MatChipsModule,
          MatSelectModule, 
          MatInputModule,
          MatRadioModule,
          MatSnackBarModule,
          MatProgressBarModule
          } 
from '@angular/material';

import {
  WpApiModule,
  WpApiLoader,
  WpApiStaticLoader,
  
} from 'wp-api-angular';
import { Http } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AuthService } from './nav-header/services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { PostEditComponent } from './post-edit/post-edit.component';

export function WpApiLoaderFactory(http: Http) {
  return new WpApiStaticLoader(http, 'http://'+environment.api_url+'/wp-json/wp/v2/', '');
}
@NgModule({

  declarations: [
    AppComponent,
    PostPageComponent,
    HomeComponent,
    NavHeaderComponent,
    PostsComponent,
    LoginComponent,
    UsersComponent,
    PostEditComponent,
    
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    WpApiModule.forRoot({ // <---
      provide: WpApiLoader,
      useFactory: (WpApiLoaderFactory),
      deps: [Http]
    }),
    MatRadioModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
  
})

export class AppModule { }

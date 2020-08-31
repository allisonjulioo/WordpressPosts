import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxEditorModule } from 'ngx-editor';
import { WpApiLoader, WpApiModule, WpApiStaticLoader } from 'wp-api-angular';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { SearchByNamePipe } from './filterdata.pipe';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostsComponent } from './posts/posts.component';
import { AuthService } from './services/auth.service';
import { UsersComponent } from './users/users.component';

// tslint:disable-next-line: deprecation
export function WpApiLoaderFactory(http: Http) {
  return new WpApiStaticLoader(
    http,
    `${environment.api_url}/wp-json/wp/v2/`,
    ''
  );
}
@NgModule({
  declarations: [
    AppComponent,
    PostPageComponent,
    NavHeaderComponent,
    PostsComponent,
    LoginComponent,
    UsersComponent,
    SearchByNamePipe,
    PaginationComponent,
  ],
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: true }),
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
    WpApiModule.forRoot({
      // <---
      provide: WpApiLoader,
      useFactory: WpApiLoaderFactory,
      deps: [Http],
    }),
    MatRadioModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

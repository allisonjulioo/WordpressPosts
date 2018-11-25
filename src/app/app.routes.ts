import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostsComponent } from './posts/posts.component';
import {Routes, ActivatedRoute,} from '@angular/router'


export const ROUTES : Routes = [
  { path: 'post-edit/:id', component: PostPageComponent, canActivate: [AuthGuard], data: { title: 'Post Edit' }},
  { path: 'post-add', component: PostPageComponent, canActivate: [AuthGuard], data: { title: 'Post Add' }},
  { path: 'posts-page', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'third-page', component: UsersComponent, canActivate: [AuthGuard] }
];


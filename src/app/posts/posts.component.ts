import { environment } from './../../environments/environment';
import { WordpressService } from './../services/wordpress.service';
import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WpApiPages } from 'wp-api-angular';
import { Headers } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { Posts } from './posts';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  @Input() token = localStorage.getItem('token');

  EditPost = null;

  public postEdit: Posts;

  posts: any = [{
    _embedded:  []
  }];

  category = new FormControl();
  selectedcategory: string;
  categoriesList: string[] = ['Saúde', 'Beleza', 'Bem estar', 'Cuidados', 'Dicas'];
  action: 'ok'
  WpApiMedia: any;
  medias: any;

  constructor(private wpApiPages: WpApiPages,
    public snackBar: MatSnackBar,
    private http: HttpClient,
    public rest: WordpressService,
    private data: DataService,
    private router: Router) {
    this.getPosts();

  }

  getPosts() {
    this.posts = [];
    this.rest.getPosts().subscribe((data: {}) => {
      console.log(data);
      this.posts = data;
      console.log(this.posts.pagination)
    });
  }
  updatePost() {
    this.router.navigate(['/post-edit']);
  }
  deletePost(id) {
    this.rest.deletePost(id)
      .subscribe(res => {
        this.getPosts();
      }, (err) => {
        console.log(err);
      }
      );
  }
}

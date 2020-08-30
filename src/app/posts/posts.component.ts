import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { WpApiPages } from 'wp-api-angular';
import { DataService } from '../services/data.service';
import { WordpressService } from './../services/wordpress.service';
import { Posts } from './posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  @Input() token = localStorage.getItem('token');

  EditPost = null;

  public postEdit: Posts;

  posts: any = [
    {
      _embedded: [],
    },
  ];

  category = new FormControl();
  selectedcategory: string;
  categoriesList: string[] = [
    'Saúde',
    'Beleza',
    'Bem estar',
    'Cuidados',
    'Dicas',
  ];
  action: 'ok';
  WpApiMedia: any;
  medias: any;

  constructor(
    private wpApiPages: WpApiPages,
    public snackBar: MatSnackBar,
    private http: HttpClient,
    public rest: WordpressService,
    private data: DataService,
    private router: Router
  ) {
    this.getPosts();
  }

  getPosts() {
    this.posts = [];
    this.rest.getPosts().subscribe((data: {}) => {
      this.posts = data;
    });
  }
  updatePost(id: string) {
    this.router.navigate(['/post-edit', id]);
  }
  deletePost(id: string) {
    this.rest.deletePost(id).subscribe(
      (res) => {
        this.getPosts();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

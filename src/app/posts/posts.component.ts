import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WpApiPosts } from 'wp-api-angular';
import { Headers } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { Posts } from './posts';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  @Input() token = localStorage.getItem('token');

  EditPost = null;

  public postEdit: Posts;

  posts = []

  @Output() postsEvent = new EventEmitter<any>();

  category = new FormControl();
  selectedcategory: string;
  categoriesList: string[] = ['Saúde', 'Beleza', 'Bem estar', 'Cuidados', 'Dicas'];
  action: 'ok'

  constructor( private wpApiPosts: WpApiPosts, 
               public snackBar: MatSnackBar, 
               private data: DataService,
               private router : Router) {
    this.getPosts();
  }


  getPosts() {
    this.wpApiPosts.getList()
      .toPromise()
      .then(response => {
        let json: any = response.json();
        this.posts = json;
      });
  }


  deletePost(id: number, index: number) {
    let headers: Headers = new Headers({
      'Authorization': 'Bearer ' + this.token
    });

    this.wpApiPosts.delete(id, { headers: headers })
      .toPromise()
      .then(response => {
        if (response['ok'] == true) {
          this.posts.splice(index, 1);
        }
      })

    this.snackBar.open('Post excluido', this.action, {
      duration: 2000,
    });
  }

  updatePost(post) {
    this.postEdit = post;
    this.data.updatePost(this.postEdit)
    this.router.navigate(['post-edit']);

  }

  ngOnInit() {
    this.data.currentPost.subscribe(posts => this.postEdit = posts);
  }
}

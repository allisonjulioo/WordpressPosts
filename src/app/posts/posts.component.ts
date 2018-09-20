import { WordpressService } from './../services/wordpress.service';
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

  public post: Posts;

  posts = []

  @Output() postsEvent = new EventEmitter<any>();

  category = new FormControl();
  selectedcategory: string;
  categoriesList: string[] = ['Saúde', 'Beleza', 'Bem estar', 'Cuidados', 'Dicas'];
  action: 'ok'

  constructor(private wp: WordpressService, private wpApiPosts: WpApiPosts, public snackBar: MatSnackBar, private data: DataService) {
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
    this.post = post;
    this.data.updatePost(this.post)

  }

  ngOnInit() {
    this.data.postEdit.subscribe(posts => this.post = posts);
    console.log(this.post);
  }
}

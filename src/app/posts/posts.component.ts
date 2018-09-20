import { WordpressService } from './../nav-header/services/wordpress.service';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { WpApiPosts } from 'wp-api-angular';
import { Headers } from '@angular/http';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  @Input() token = localStorage.getItem('token');

  posts = [];
  editingPost = null;


  category = new FormControl();
  selectedcategory: string;
  categoriesList: string[] = ['Saúde', 'Beleza', 'Bem estar', 'Cuidados', 'Dicas'];
  action: 'ok'

  constructor(private wp: WordpressService, private wpApiPosts: WpApiPosts, public snackBar: MatSnackBar) {
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

 public updatePost(post) {
    this.editingPost = post;
    console.log(this.editingPost)
  }


}

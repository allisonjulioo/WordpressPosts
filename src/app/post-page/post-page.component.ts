import { environment } from './../../environments/environment';
import { WordpressService } from './../services/wordpress.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WpApiPosts } from 'wp-api-angular';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../services/data.service';
import { Posts } from '../posts/posts';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})

export class PostPageComponent implements OnInit {

  @Input() token = localStorage.getItem('token');

  posts = {
    title: '',
    content: '',
    url: '',
    status: 'publish'
  }
  public postEdit: Posts;

  apiUrl = environment.api_url
  urlPost: string;
  action: any;
  editorConfig = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "5000",
    "width": "auto",
    "minWidth": "0",
    "resize": "both",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Comece a escrever seu post",
    "imageEndPoint": "http://localhost/Api/wp-content/uploads/2018/09/",
    "toolbar": [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontName", "fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
      ["link", "unlink", "image", "video"]
    ]
  }
  constructor(private wp: WordpressService,
    private http: HttpClient,
    private wpApiPosts: WpApiPosts,
    private router: Router,
    public snackBar: MatSnackBar,
    private data: DataService) {
  }

  ngOnInit() {
    this.data.currentPost.subscribe(posts => this.postEdit = posts);
    if (this.postEdit.id) {
      this.posts.title = this.postEdit.title.rendered;
      this.posts.content = this.postEdit.content.rendered;
      this.posts.url = this.postEdit.link;
    }
  }


  createPost() {
    let headers: Headers = new Headers({
      'Authorization': 'Bearer ' + this.token
    });

    this.wpApiPosts.create(this.posts, { headers: headers })
      .toPromise()
      .then(response => {
        this.router.navigate(['posts-page']);
        this.snackBar.open('Post criado com sucesso!', this.action, {
          duration: 2000,
        });
      })
  }
  getPost($event) {
    this.posts = $event;
  }
}

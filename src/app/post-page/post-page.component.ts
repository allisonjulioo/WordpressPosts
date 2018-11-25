import { environment } from './../../environments/environment';
import { WordpressService } from './../services/wordpress.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WpApiPosts, WpApiMedia } from 'wp-api-angular';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
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

  posts: any = {};
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
    private rest: WordpressService,
    private router: Router,
    public snackBar: MatSnackBar,
    private data: DataService,
    private route: ActivatedRoute)
     {
  }

  ngOnInit() {
    this.rest.getPost(this.router.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.posts = data;
    });
  }
  addPost() {
    if (!this.posts.id) {
      this.rest.addPost(this.posts).subscribe((result) => {
        this.router.navigate(['posts-page']);
      }, (err) => {
        console.log(err);
      });
    }
    else {
      this.updatePost()
    }
  }
  updatePost() {
    this.rest.updatePost(this.router.snapshot.params['id'], this.posts).subscribe((result) => {
      this.router.navigate(['posts']);
    }, (err) => {
      console.log(err);
    });
  }

}

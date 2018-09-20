import { environment } from './../../environments/environment';
import { WordpressService } from './../nav-header/services/wordpress.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WpApiPosts } from 'wp-api-angular';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})

export class PostPageComponent implements OnInit {
  
  @Input() token = localStorage.getItem('token');

  new_post = {
    title: '',
    content: '',
    status: 'publish'
  }
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
  constructor(private wp: WordpressService, private http: HttpClient, private wpApiPosts: WpApiPosts, private router : Router, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }
  createPost() {       
    let headers: Headers = new Headers({
      'Authorization': 'Bearer ' + this.token
    });
  
    this.wpApiPosts.create(this.new_post, { headers: headers })
    .toPromise()
    .then( response => {
      this.router.navigate(['posts-page']);   
      this.snackBar.open('Post criado com sucesso!', this.action, {
        duration: 2000,
        });
    })
  }
}

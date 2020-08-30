import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from '../posts/posts';
import { DataService } from '../services/data.service';
import { environment } from './../../environments/environment';
import { WordpressService } from './../services/wordpress.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  @Input() token = localStorage.getItem('token');

  posts: any = {};
  public imageUrl: string;
  public postEdit: Posts;
  public content: HTMLElement | string;
  public title: HTMLElement | string;

  apiUrl = environment.api_url;
  urlPost: string;
  action: any;
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '5000',
    width: 'auto',
    minWidth: '0',
    resize: 'both',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Comece a escrever seu post',
    imageEndPoint: 'http://localhost/Api/wp-content/uploads/2018/09/',
    toolbar: [
      [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'superscript',
        'subscript',
      ],
      ['fontName', 'fontSize', 'color'],
      [
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
      ],
      [
        'paragraph',
        'blockquote',
        'removeBlockquote',
        'horizontalLine',
        'orderedList',
        'unorderedList',
      ],
      ['link', 'unlink', 'image', 'video'],
    ],
  };
  constructor(
    private wp: WordpressService,
    private http: HttpClient,
    private rest: WordpressService,
    private router: Router,
    public snackBar: MatSnackBar,
    private data: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.rest.getPost(this.route.snapshot.params.id).subscribe((data) => {
      console.log(data);
      this.posts = data;
      this.imageUrl = this.posts['_embedded']['wp:featuredmedia'][0][
        'media_details'
      ].sizes['medium'].source_url;
      this.content = data.content.rendered;
      this.title = data.title.rendered;
    });
  }
  addPost() {
    this.posts.content.rendered = this.content;
    this.posts.title.rendered = this.title;
    if (!this.posts.id) {
      this.rest.addPost(this.posts).subscribe(
        () => {
          this.router.navigate(['posts-page']);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.updatePost();
    }
  }
  updatePost() {
    this.rest.updatePost(this.route.snapshot.params.id, this.posts).subscribe(
      (result) => {
        this.router.navigate(['posts-page']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

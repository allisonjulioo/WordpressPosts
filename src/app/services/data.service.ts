import { Posts } from './../posts/posts';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
public post = new Posts();

public postEdit = new BehaviorSubject(this.post);
currentPost = this.postEdit.asObservable();

  constructor() {
    this.post.title = 'Test.'
   }

   updatePost(posts : Posts){
     this.postEdit.next(posts);
   }
}

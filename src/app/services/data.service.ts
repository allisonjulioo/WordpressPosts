import { Posts } from './../posts/posts';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
public postEdit = new Posts();

public dataPost = new BehaviorSubject(this.postEdit);
currentPost = this.dataPost.asObservable();

  constructor() {
   }

   updatePost(postEdit : Posts){
     this.dataPost.next(postEdit);
   }
}

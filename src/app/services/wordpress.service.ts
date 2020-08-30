import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Posts } from '../posts/posts';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  constructor(private http: HttpClient) {}
  endpoint = `${environment.api_url}wp-json/wp/v2/`;
  token = localStorage.getItem('token');
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    }),
  };

  getPosts(): Observable<any> {
    return this.http
      .get(this.endpoint + 'posts?_embed', this.httpOptions)
      .pipe(map((res) => res));
  }
  getDraftPosts(): Observable<any> {
    return this.http
      .get(this.endpoint + 'posts?status=draft', this.httpOptions)
      .pipe(map((res) => res));
  }

  getPost(id: string): Observable<Posts> {
    return this.http
      .get<Posts>(this.endpoint + 'posts/' + id + '?_embed')
      .pipe(map((res) => res));
  }

  addPost(post: Posts): Observable<Posts> {
    return this.http
      .post<Posts>(
        this.endpoint + 'posts?_embed',
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(
        tap((p) => console.log(`added post w/ id=${post.id}`)),
        catchError(this.handleError<Posts>('addpost'))
      );
  }

  updatePost(id: string, post: Posts): Observable<any> {
    return this.http
      .put(
        this.endpoint + 'posts/' + id,
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`updated post id=${id}`)),
        catchError(this.handleError<any>('updatepost'))
      );
  }

  deletePost(id: string): Observable<any> {
    return this.http
      .delete<any>(this.endpoint + 'posts/' + id + '?_embed', this.httpOptions)
      .pipe(
        tap((_) => console.log(`deleted post id=${id}`)),
        catchError(this.handleError<any>('deletepost'))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(private http: HttpClient) { }
  endpoint = 'http://localhost/alink/wp-json/wp/v2/';
  token = localStorage.getItem('token');
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  'Bearer ' + this.token
    })
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  getPosts(): Observable<any> {
    return this.http.get(this.endpoint + 'works?_embed', this.httpOptions) 
    .pipe(map(this.extractData));
  }
  getDraftPosts(): Observable<any> {
    return this.http.get(this.endpoint + 'works?status=draft', this.httpOptions) 
    .pipe(map(this.extractData));
  }

  getPost(id): Observable<any> {
    return this.http.get(this.endpoint + 'works/' + id+'?_embed').pipe(
      map(this.extractData ) );
  }
  
  addPost (post): Observable<any> {
    console.log(post);
    return this.http.post<any>(this.endpoint + 'works?_embed', JSON.stringify(post), this.httpOptions).pipe(
      tap((post) => console.log(`added post w/ id=${post.id}`)),
      catchError(this.handleError<any>('addpost'))
    );
  }
  
  updatePost (id, post): Observable<any> {
    return this.http.put(this.endpoint + 'works/' + id+'?_embed', JSON.stringify(post), this.httpOptions).pipe(
      tap(_ => console.log(`updated post id=${id}`)),
      catchError(this.handleError<any>('updatepost'))
    );
  }
  
  deletePost (id): Observable<any> {
    return this.http.delete<any>(this.endpoint + 'works/' + id+'?_embed', this.httpOptions).pipe(
      tap(_ => console.log(`deleted post id=${id}`)),
      catchError(this.handleError<any>('deletepost'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
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
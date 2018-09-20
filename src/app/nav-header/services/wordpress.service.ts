import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    const apiUrl = environment.api_url
    return this.http.get<any[]>('http://'+apiUrl +'/wp-json/wp/v2/posts?_embed', {
      params: {
        per_page: '6'
      }
    });
  }
}
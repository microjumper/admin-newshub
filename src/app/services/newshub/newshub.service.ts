import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Article } from "../../types/article.type";

@Injectable({
  providedIn: 'root'
})
export class NewshubService {

  constructor(private httpClient: HttpClient) { }

  public feedNewsHubDb(articles: Article[]) {
    return this.httpClient.post<Article[]>('http://localhost:7071/api/FeedDatabase', articles);
  }
}

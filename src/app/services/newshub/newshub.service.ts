import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";

import { Article } from "../../types/article.type";
import { PaginatedResponse } from "../../types/paginated.type";

@Injectable({
  providedIn: 'root'
})
export class NewshubService {

  private readonly baseUrl: string | undefined;
  private readonly getCode: string | undefined;
  private readonly searchCode: string | undefined;

  constructor(private httpClient: HttpClient) {
    if (window.location.hostname === "localhost") {
      this.baseUrl = "http://localhost:7071/api/articles";
      this.getCode = '';
      this.searchCode = '';
    } else {  // process is not available in browser
      this.baseUrl = "https://newshubfunction.azurewebsites.net/api/articles";
      this.getCode = `?code=${process.env['GET_CODE']}`;
      this.searchCode = `?code=${process.env['SEARCH_CODE']}`;
    }
  }

  getArticles(limit: number, pageNumber = 1): Observable<PaginatedResponse> {
    const offset = pageNumber - 1;
    if (limit > 0 && offset >= 0) {
      return this.httpClient.get<PaginatedResponse>(`${this.baseUrl}/all/${limit}/${offset}${this.getCode}`);
    }
    return of({ totalRecords: 0, articles: [] })
  }

  getArticleById(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.baseUrl}/get/${id}${this.getCode}`);
  }

  addArticle(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(`${this.baseUrl}/add${this.getCode}`, article);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.httpClient.put<Article>(`${this.baseUrl}/update/${article.id}${this.getCode}`, article);
  }

  deleteArticle(id: string): Observable<Article> {
    return this.httpClient.delete<Article>(`${this.baseUrl}/delete/${id}${this.getCode}`);
  }

  search(searchTerm: string, limit: number, pageNumber = 1): Observable<PaginatedResponse> {
    const offset = pageNumber - 1;
    if (limit > 0 && offset >= 0) {
      return this.httpClient.get<PaginatedResponse>(`${this.baseUrl}/search/${searchTerm}/${limit}/${offset}${this.searchCode}`);
    }
    return of({ totalRecords: 0, articles: [] });
  }

  feedNewsHubDb(articles: Article[]) {
    return this.httpClient.post<Article[]>('http://localhost:7071/api/FeedDatabase', articles);
  }
}

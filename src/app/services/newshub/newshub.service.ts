import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";

import { Article } from "../../types/article.type";
import { PaginatedResponse } from "../../types/paginated.type";

@Injectable({
  providedIn: 'root'
})
export class NewshubService {

  private readonly baseUrl: string;
  private readonly getAllCode: string;
  private readonly getByCode: string;
  private readonly addCode: string;
  private readonly updateCode: string;
  private readonly deleteCode: string;
  private readonly searchCode: string;

  constructor(private httpClient: HttpClient) {
    if (window.location.hostname === "localhost") {
      this.baseUrl = "http://localhost:7071/api/articles";
      this.getAllCode = '';
      this.getByCode = '';
      this.addCode = '';
      this.updateCode = '';
      this.deleteCode = '';
      this.searchCode = '';
    } else {  // process is not available in browser
      this.baseUrl = "https://newshubfunction.azurewebsites.net/api/articles";
      this.getAllCode = `?code=${process.env['GET_ALL_CODE']}`;
      this.getByCode = `?code=${process.env['GET_BY_CODE']}`;
      this.addCode = `?code=${process.env['ADD_CODE']}`;
      this.updateCode = `?code=${process.env['UPDATE_CODE']}`;
      this.deleteCode = `?code=${process.env['DELETE_CODE']}`;
      this.searchCode = `?code=${process.env['SEARCH_CODE']}`;
    }
  }

  getArticles(limit: number, pageNumber = 1): Observable<PaginatedResponse> {
    const offset = pageNumber - 1;
    if (limit > 0 && offset >= 0) {
      return this.httpClient.get<PaginatedResponse>(`${this.baseUrl}/all/${limit}/${offset}${this.getAllCode}`);
    }
    return of({ totalRecords: 0, articles: [] })
  }

  getArticleById(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.baseUrl}/get/${id}${this.getByCode}`);
  }

  addArticle(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(`${this.baseUrl}/add${this.addCode}`, article);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.httpClient.put<Article>(`${this.baseUrl}/update/${article.id}${this.updateCode}`, article);
  }

  deleteArticle(id: string): Observable<Article> {
    return this.httpClient.delete<Article>(`${this.baseUrl}/delete/${id}${this.deleteCode}`);
  }

  search(searchTerm: string, limit: number, pageNumber = 1): Observable<PaginatedResponse> {
    const offset = pageNumber - 1;
    if (limit > 0 && offset >= 0) {
      return this.httpClient.get<PaginatedResponse>(`${this.baseUrl}/search/${encodeURI(searchTerm)}/${limit}/${offset}${this.searchCode}`);
    }
    return of({ totalRecords: 0, articles: [] });
  }


  feedNewsHubDb(articles: Article[]) {  // from localhost only
    if(typeof process !== 'undefined' && process !== null) {
      return this.httpClient.post<Article[]>(`${process.env['FEED_ENDPOINT']}`, articles);
    }
    return of([]);
  }
}

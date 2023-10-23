import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { map, Observable } from "rxjs";

import { Article } from "../../types/article.type";

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  private readonly apiKey = process.env['NEWS_API_KEY'];
  private readonly apiUrl = 'https://newsapi.org/v2/top-headlines';
  
  constructor(private httpClient: HttpClient) { }

  getTopHeadlines(): Observable<Article[]> {
    return this.httpClient.get<NewsApiResponse>(`${this.apiUrl}?country=us&apiKey=${this.apiKey}`).pipe(
      map(response => response.articles.map((r: any) => this.toArticle(r)))
    )
  }

  private toArticle(raw: any): Article {
    return {
      author: raw.author,
      description: raw.description,
      title: raw.title,
      urlToImage: raw.urlToImage,
      publishedAt: raw.publishedAt
    }
  }
}

interface NewsApiResponse
{
  status: string;
  totalResults: number;
  articles: [];
}

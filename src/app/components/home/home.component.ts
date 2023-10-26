import { Component } from '@angular/core';

import { TableLazyLoadEvent } from "primeng/table";

import { NewsApiService } from "../../services/news-api/news-api.service";
import { NewshubService } from "../../services/newshub/newshub.service";
import { Article } from "../../types/article.type";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  readonly rows: number = 10;

  totalRecords: number = 0;
  articles: Article[] = [];

  private tmp= new Map<string, Article>();

  constructor(private newsApiService: NewsApiService, private newshubService: NewshubService) { }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ? event.first : 0;
    const pageNumber = 1 + (first / this.rows);
    this.getArticles(pageNumber);
  }

  getArticles(pageNumber = 1): void {
    this.newshubService.getArticles(this.rows, pageNumber).subscribe({
      next: (response) => {
        this.totalRecords = response.totalRecords;
        this.articles = response.articles;
      },
      error: () => {
        this.articles = [];
        this.totalRecords = 0;
      }
    });
  }

  fetchNews(): void {
    this.newsApiService.getTopHeadlines().subscribe(
      response => {
        this.articles = response;
        console.log(response);
      }
    );
  }

  feedDatabase(): void {
    this.newshubService.feedNewsHubDb(this.articles).subscribe(
      response => console.log(response)
    )
  }

  onRowEditInit(article: Article) {
    if (article.id != null) {
      this.tmp.set(article.id, {...article});
    }
  }

  onRowEditSave(article: Article) {
    console.log(article)
  }

  onRowEditCancel(article: Article, rowIndex: number) {
    if (article.id != null) {
      this.articles[rowIndex] = this.tmp.get(article.id) as Article;
      this.tmp.delete(article.id)
    }
  }
}

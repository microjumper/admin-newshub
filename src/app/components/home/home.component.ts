import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { TableLazyLoadEvent } from "primeng/table";
import { MenuItem } from "primeng/api";

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

  items: MenuItem[] | undefined;

  constructor(private newsApiService: NewsApiService, private newshubService: NewshubService,
              private router: Router) {
    this.items = [
      {
        label: 'User',
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-refresh',
            command: () => {
              this.logout();
            }
          }
        ]
      }
    ];
  }

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

  onSelect(article: Article) {
    this.router.navigate(['articles', article.id]).then()
  }

  createArticle(): void {
    this.router.navigate(['articles', 'create']).then()
  }

  private logout(): void {

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
}

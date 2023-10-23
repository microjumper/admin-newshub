import { Component } from '@angular/core';

import { NewsApiService } from "../../services/news-api/news-api.service";
import {NewshubService} from "../../services/newshub/newshub.service";
import {Article} from "../../types/article.type";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  articles: Article[] = [];
  constructor(private newsApiService: NewsApiService, private newshubService: NewshubService) { }

  public fetchNews(): void {
    this.newsApiService.getTopHeadlines().subscribe(
      response => {
        this.articles = response;
        console.log(response);
      }
    );
  }

  public feedDatabase(): void {
    this.newshubService.feedNewsHubDb(this.articles).subscribe(
      response => console.log(response)
    )
  }
}

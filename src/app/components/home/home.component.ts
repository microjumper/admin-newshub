import { Component, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";

import {debounceTime, distinctUntilChanged, filter, map, Observable, Subscription, switchMap} from "rxjs";

import { TableLazyLoadEvent } from "primeng/table";
import { MenuItem } from "primeng/api";

import { NewsApiService } from "../../services/news-api/news-api.service";
import { NewshubService } from "../../services/newshub/newshub.service";
import { Article } from "../../types/article.type";
import { PaginatedResponse } from "../../types/paginated.type";
import { AuthService } from "../../services/auth/auth.service";
import { ToastService } from "../../services/toast/toast.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  readonly alphanumericWithSpace: RegExp = /[\da-zA-Z\s]/;

  readonly rows: number = 10;

  totalRecords: number = 0;
  articles: Article[] = [];

  searchForm: FormGroup;

  items: MenuItem[] | undefined;

  private subscription: Subscription | undefined;

  constructor(private newsApiService: NewsApiService, private newshubService: NewshubService,
              private router: Router, private authService: AuthService, private toastService: ToastService) {
    this.searchForm = new FormGroup({
      search: new FormControl<string>('')
    });

    this.initMenu();
    this.initSearchbar();
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ? event.first : 0;
    const pageNumber = 1 + (first / this.rows);
    this.loadData({ pageNumber });
  }

  onSelect(article: Article) {
    this.router.navigate(['articles', article.id]).then()
  }

  createArticle(): void {
    this.router.navigate(['articles', 'create']).then()
  }

  onImageError(image: HTMLImageElement): void {
    const fallback = "assets/placeholder-image.png";
    if(image.src !== fallback) {
      image.src = fallback
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private initMenu(): void {
    this.items = [
      {
        label: this.authService.getActiveAccountName() || 'User',
        items: [
          {
            label: 'Feed DB',
            icon: 'pi pi-database',
            command: () => this.feedDatabase(),
            disabled: true
          },
          {
            label: 'Logout',
            icon: 'pi pi-refresh',
            command: () => this.authService.logout()
          }
        ]
      }
    ];
  }

  private initSearchbar(): void {
    this.subscription = this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(250),
      map(searchTerm => searchTerm.trim()),
      distinctUntilChanged(),
      filter(searchTerm => searchTerm.length >= 3 || searchTerm.length === 0),
    ).subscribe(searchTerm => this.loadData({searchTerm}));
  }

  private loadData({ searchTerm = '', pageNumber = 1 }: { searchTerm?: string, pageNumber?: number }): void {
    let observable: Observable<PaginatedResponse>;

    if(searchTerm.length >= 3) {
      observable = this.newshubService.search(searchTerm.replace(/\s+/g, ' ').trim(), this.rows, pageNumber);
    } else {
      observable = this.newshubService.getArticles(this.rows, pageNumber)
    }

    const subscription: any = observable.subscribe({
      next: (response) => {
        this.totalRecords = response.totalRecords;
        this.articles = response.articles;
      },
      error: () => {
        this.articles = [];
        this.totalRecords = 0;
      },
      complete: () => subscription.unsubscribe()
    });
  }

  private feedDatabase(): void {
    this.newsApiService.getTopHeadlines().pipe(
      switchMap(articles => this.newshubService.feedNewsHubDb(articles))
    ).subscribe({
      next: articles => {
        this.toastService.showSuccess(`${articles.length} articles added to the database`);
        console.log(articles);
      },
      error: (error: Error) => {
        this.toastService.showError();
        console.error(error.message);
      }
    });
  }
}

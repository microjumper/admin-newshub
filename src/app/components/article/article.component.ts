import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { NewshubService } from "../../services/newshub/newshub.service";
import {Article} from "../../types/article.type";
import {Observable} from "rxjs";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{

  articleForm: FormGroup;

  private readonly nullId = "0";

  constructor(private activatedRoute: ActivatedRoute, private newshubService: NewshubService) {
    this.articleForm = new FormGroup({
      id: new FormControl(this.nullId),
      title: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
      author: new FormControl(''),
      description: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
      image: new FormControl(''),
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || "0";
    if(id !== this.nullId) {
      this.getArticleById(id);
    }
  }

  getArticleById(id: string): void {
    this.activatedRoute.data.subscribe(
      data => {
        if (data && data['article']) {
          const article = data['article'];
          this.articleForm.patchValue({
            id: article.id,
            title: article.title,
            author: article.author,
            description: article.description,
            image: article.urlToImage
          });
        }
      }
    );
  }

  save(articleForm: FormGroup) {
    const article: Article = articleForm.value;

    console.log(article);

    let observable: Observable<Article>;

    if(article.id !== this.nullId) {
      observable = this.newshubService.updateArticle(article);
    } else {
      observable = this.newshubService.addArticle(article);
    }

    observable.subscribe({
      next: article => console.log(article)
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { NewshubService } from "../../services/newshub/newshub.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{

  articleForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private newshubService: NewshubService) {
    this.articleForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
      author: new FormControl(''),
      description: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
      image: new FormControl(''),
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '0';
    if(id !== '0') {
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
    console.log(articleForm.value)
  }
}

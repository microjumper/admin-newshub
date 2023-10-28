import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Observable } from "rxjs";

import { ConfirmationService } from "primeng/api";

import { NewshubService } from "../../services/newshub/newshub.service";
import { Article } from "../../types/article.type";
import { ToastService } from "../../services/toast/toast.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{

  articleForm: FormGroup;

  readonly nullId = "0";

  constructor(private activatedRoute: ActivatedRoute, private newshubService: NewshubService, private router: Router,
              private confirmationService: ConfirmationService, private toastService: ToastService) {
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

  onSubmit() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.save()
    });
  }

  private save() {
    const article: Article = this.articleForm.value;

    let observable: Observable<Article>;

    if(article.id !== this.nullId) {
      observable = this.newshubService.updateArticle(article);
    } else {
      observable = this.newshubService.addArticle(article);
    }

    observable.subscribe({
      next: article => this.toastService.showSuccess(),
      complete: () => this.router.navigate(['../']).then(),
      error: (error: Error) => this.toastService.showError(`${error.message}`)
    });
  }

  delete(button: HTMLButtonElement): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const article: Article = this.articleForm.value;

        if(article.id) {
          this.newshubService.deleteArticle(article.id).subscribe({
            next: article => this.toastService.showSuccess(),
            complete: () => this.router.navigate(['../']).then(),
            error: (error: Error) => this.toastService.showError(`${error.message}`)
          });
        }
      }
    });

    button.blur();
  }
}

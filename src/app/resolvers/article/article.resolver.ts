import { ResolveFn, Router } from '@angular/router';
import { inject } from "@angular/core";

import { catchError, EMPTY } from "rxjs";

import { NewshubService } from "../../services/newshub/newshub.service";
import { Article } from "../../types/article.type";

export const articleResolver: ResolveFn<Article> = (route, state) => {
  const newshubService = inject(NewshubService);
  const router = inject(Router);

  return newshubService.getArticleById(route.paramMap.get('id')!).pipe(
    catchError((error: Error) => {
      console.error(error.message);
      router.navigate(['/']).then();
      return EMPTY
    })
  );
};

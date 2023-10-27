import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }  from "./components/home/home.component";
import { ArticleComponent } from "./components/article/article.component";
import { articleResolver } from "./resolvers/article/article.resolver";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles/create', component: ArticleComponent },
  { path: 'articles/:id', component: ArticleComponent, resolve: { article: articleResolver }},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

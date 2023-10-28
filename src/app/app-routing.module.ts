import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }  from "./components/home/home.component";
import { ArticleComponent } from "./components/article/article.component";
import { articleResolver } from "./resolvers/article/article.resolver";
import { LoginComponent } from "./components/login/login.component";
import { authGuard } from "./guards/auth/auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'articles/create', component: ArticleComponent, canActivate: [authGuard] },
  { path: 'articles/:id', component: ArticleComponent, resolve: { article: articleResolver }, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

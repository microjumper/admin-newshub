import {Article} from "./article.type";

export interface PaginatedResponse {
  totalRecords: number;
  articles: Article[];
}

import { IItem } from './search-item.model';

export interface Root {
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: IItem[];
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

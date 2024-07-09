import { IItem } from './search-item.model';

export interface IData {
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: IItem[];
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

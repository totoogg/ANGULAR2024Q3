export interface IItem {
  kind: string;
  id: string;
  snippet: ISnippet;
  statistics: IStatistics;
}

export interface ISnippet {
  publishedAt: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
}

export interface IThumbnails {
  high: ISizeImage;
}

export interface ISizeImage {
  url: string;
}

export interface ILocalized {
  title: string;
  description: string;
}

export interface IStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

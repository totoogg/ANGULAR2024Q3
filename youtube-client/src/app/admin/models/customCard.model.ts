export interface ICustomCard {
  id: string;
  videoLink: string;
  snippet: {
    description: string;
    publishedAt: string;
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  statistics:{
    viewCount: string;
  }
}

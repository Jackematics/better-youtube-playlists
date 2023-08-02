type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Thumbnails = {
  default: Thumbnail;
};

type ResourceId = {
  videoId: string;
};

type Snippet = {
  title: string;
  thumbnails: Thumbnails;
  resourceId: ResourceId;
};

type Item = {
  snippet: Snippet;
};

type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

export type YoutubePlaylistItemsResponse = {
  pageInfo: PageInfo;
  items: Item[];
};

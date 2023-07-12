export type PlaylistItem = {
  id: string;
  totalResults: number;
};

type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

export type YoutubePlaylistItemsResponse = {
  pageInfo: PageInfo;
};

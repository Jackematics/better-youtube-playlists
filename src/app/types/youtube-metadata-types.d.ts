export type PlaylistMetadata = {
  id: string;
  title: string;
  channelTitle: string;
};

type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

type Snippet = {
  title: string;
  channelTitle: string;
};

type MetadataItem = {
  id: string;
  snippet: Snippet;
};

export type YoutubeMetadataResponse = {
  items: MetadataItem[];
};

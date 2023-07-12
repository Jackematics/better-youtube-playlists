export type SelectedPlaylistMetadata = {
  id: string;
  title: string;
  channelTitle: string;
  totalResults: number;
};

export type PlaylistMetadata = {
  id: string;
  title: string;
  channelTitle: string;
};

type Snippet = {
  title: string;
  channelTitle: string;
};

type MetadataItem = {
  id: string;
  snippet: Snippet;
};

export type YoutubePlaylistMetadataResponse = {
  items: MetadataItem[];
};

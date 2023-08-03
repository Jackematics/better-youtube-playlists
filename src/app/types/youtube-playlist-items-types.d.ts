type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type PlaylistItem = {
  videoId: string;
  thumbnail: Thumbnail;
  title: string;
};

export type PlaylistData = {
  id: string;
  totalResults: number;
  playlistItems: PlaylistItem[];
};

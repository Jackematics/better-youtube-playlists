type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Item = {
  videoId: string;
  thumbnail: Thumbnail;
  title: string;
};

export type PlaylistData = {
  id: string;
  totalResults: number;
  items: Item[];
};

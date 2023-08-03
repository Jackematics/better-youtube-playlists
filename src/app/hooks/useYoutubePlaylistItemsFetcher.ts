import { useState } from "react";
import FetchHandler from "../handlers/fetch-handler";
import { PlaylistData } from "../types/youtube-playlist-items-types";

type YoutubePlaylistItemsFetcher = {
  updatePlaylistItemCollectionState: (playlistId: string) => Promise<void>;
  playlistItemCollection: PlaylistData[];
};

const useYoutubePlaylistItemsFetcher = (): YoutubePlaylistItemsFetcher => {
  const [playlistItemCollection, setPlaylistItemCollection] = useState<
    PlaylistData[]
  >([]);

  const updatePlaylistItemCollectionState = async (
    playlistId: string
  ): Promise<void> => {
    const youtubePlaylistItemsData =
      await FetchHandler.fetchYoutubePlaylistItemsData(playlistId);

    setPlaylistItemCollection([
      ...playlistItemCollection,
      {
        id: playlistId,
        totalResults: youtubePlaylistItemsData.pageInfo.totalResults,
        playlistItems: youtubePlaylistItemsData.items.map((item) => ({
          videoId: item.snippet.resourceId.videoId,
          thumbnail: item.snippet.thumbnails.default,
          title: item.snippet.title,
        })),
      },
    ]);
  };

  return {
    updatePlaylistItemCollectionState,
    playlistItemCollection,
  };
};

export default useYoutubePlaylistItemsFetcher;

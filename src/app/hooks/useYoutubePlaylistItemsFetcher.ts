import { useState } from "react";
import Config from "../config";
import FetchHandler from "../handlers/fetch-handler";
import {
  PlaylistItem,
  YoutubePlaylistItemsResponse,
} from "../types/youtube-playlist-items-types";

type YoutubePlaylistItemsFetcher = {
  updatePlaylistItemCollectionState: (playlistId: string) => Promise<void>;
  playlistItemCollection: PlaylistItem[];
};

const useYoutubePlaylistItemsFetcher = (): YoutubePlaylistItemsFetcher => {
  const [playlistItemCollection, setPlaylistItemCollection] = useState<
    PlaylistItem[]
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
      },
    ]);
  };

  return {
    updatePlaylistItemCollectionState,
    playlistItemCollection,
  };
};

export default useYoutubePlaylistItemsFetcher;

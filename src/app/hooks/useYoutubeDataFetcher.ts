import { useState } from "react";
import {
  MetadataItem,
  PlaylistMetadata,
  YoutubeMetadataResponse,
} from "../youtube-metadata-types";
import { metadata } from "../layout";
import Config from "../config";

type YoutubeDataFetcher = {
  addPlaylistId: (playlistId: string) => void;
  playlistMetadataCollection: PlaylistMetadata[];
};

const useYoutubeDataFetcher = (): YoutubeDataFetcher => {
  const [playlistMetadataCollection, setPlaylistMetadataCollection] = useState<
    PlaylistMetadata[]
  >([]);

  const addPlaylistId = async (playlistId: string) => {
    const res: Response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${Config.youtubeApiKey}&maxResults=5`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const metadata: YoutubeMetadataResponse = await res.json();

    setPlaylistMetadataCollection([
      ...playlistMetadataCollection,
      { id: metadata.items[0].id, title: metadata.items[0].snippet.title },
    ]);
  };

  return { addPlaylistId, playlistMetadataCollection };
};

export default useYoutubeDataFetcher;

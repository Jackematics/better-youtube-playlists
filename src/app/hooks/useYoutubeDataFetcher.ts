import { useState } from "react";
import {
  PlaylistMetadata,
  YoutubeMetadataResponse,
} from "../types/youtube-metadata-types";
import Config from "../config";
import FetchHandler from "../handlers/fetch-handler";
import { ValidationResult } from "../types/validation-types";

type YoutubeDataFetcher = {
  addPlaylistId: (playlistId: string) => Promise<ValidationResult>;
  playlistMetadataCollection: PlaylistMetadata[];
};

const useYoutubeDataFetcher = (): YoutubeDataFetcher => {
  const [playlistMetadataCollection, setPlaylistMetadataCollection] = useState<
    PlaylistMetadata[]
  >([]);

  const addPlaylistId = async (
    playlistId: string
  ): Promise<ValidationResult> => {
    const youtubeMetadata = (await FetchHandler.fetch(
      `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${Config.youtubeApiKey}&maxResults=5`
    )) as YoutubeMetadataResponse;

    if (youtubeMetadata.items.length > 0) {
      setPlaylistMetadataCollection([
        ...playlistMetadataCollection,
        {
          id: playlistId,
          title: youtubeMetadata.items[0].snippet.title,
        },
      ]);

      return { valid: true, message: "" };
    } else {
      return { valid: false, message: "Invalid playlist id" };
    }
  };

  return { addPlaylistId, playlistMetadataCollection };
};

export default useYoutubeDataFetcher;

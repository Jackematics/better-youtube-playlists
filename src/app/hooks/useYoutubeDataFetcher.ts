import { useState } from "react";
import {
  PlaylistMetadata,
  YoutubeMetadataResponse,
} from "../types/youtube-metadata-types";
import Config from "../config";
import FetchHandler from "../handlers/fetch-handler";
import { ValidationResult } from "../types/validation-types";
import PlaylistValidator from "../validators/playlist-validator";

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

    const playlistValidationResult = PlaylistValidator.validatePlaylistData(
      playlistId,
      playlistMetadataCollection,
      youtubeMetadata
    );

    if (playlistValidationResult.valid) {
      setPlaylistMetadataCollection([
        ...playlistMetadataCollection,
        {
          id: playlistId,
          title: youtubeMetadata.items[0].snippet.title,
          channelTitle: youtubeMetadata.items[0].snippet.channelTitle,
        },
      ]);
    }

    return playlistValidationResult;
  };

  return { addPlaylistId, playlistMetadataCollection };
};

export default useYoutubeDataFetcher;

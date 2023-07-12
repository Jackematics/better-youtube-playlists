import { useState } from "react";
import {
  PlaylistMetadata,
  YoutubePlaylistMetadataResponse,
} from "../types/youtube-playlist-metadata-types";
import Config from "../config";
import FetchHandler from "../handlers/fetch-handler";
import { ValidationResult } from "../types/validation-types";
import PlaylistValidator from "../validators/playlist-validator";

type YoutubeMetadataFetcher = {
  updatePlaylistMetadataState: (playlistId: string) => Promise<void>;
  playlistMetadataCollection: PlaylistMetadata[];
  playlistMetadataValidationResult: ValidationResult;
};

const useYoutubeMetadataFetcher = (): YoutubeMetadataFetcher => {
  const [playlistMetadataCollection, setPlaylistMetadataCollection] = useState<
    PlaylistMetadata[]
  >([]);
  const [
    playlistMetadataValidationResult,
    setPlaylistMetadataValidationResult,
  ] = useState<ValidationResult>({ valid: true, message: "" });

  const updatePlaylistMetadataState = async (
    playlistId: string
  ): Promise<void> => {
    let playlistValidationResult;
    try {
      const youtubePlaylistMetadata =
        await FetchHandler.fetchYoutubePlaylistMetadata(playlistId);

      playlistValidationResult =
        PlaylistValidator.validatePlaylistMetadataResponse(
          playlistId,
          playlistMetadataCollection,
          youtubePlaylistMetadata
        );

      if (playlistValidationResult.valid) {
        setPlaylistMetadataCollection([
          ...playlistMetadataCollection,
          {
            id: playlistId,
            title: youtubePlaylistMetadata.items[0].snippet.title,
            channelTitle: youtubePlaylistMetadata.items[0].snippet.channelTitle,
          },
        ]);
      }
    } catch {
      playlistValidationResult = {
        valid: false,
        message: "Internal server error",
      };
    }

    setPlaylistMetadataValidationResult(playlistValidationResult);
  };

  return {
    updatePlaylistMetadataState,
    playlistMetadataCollection,
    playlistMetadataValidationResult,
  };
};

export default useYoutubeMetadataFetcher;

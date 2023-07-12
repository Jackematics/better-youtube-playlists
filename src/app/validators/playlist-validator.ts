import { ValidationResult } from "../types/validation-types";
import {
  PlaylistMetadata,
  YoutubePlaylistMetadataResponse,
} from "../types/youtube-playlist-metadata-types";

export default class PlaylistValidator {
  public static validatePlaylistMetadataResponse(
    playlistId: string,
    playlistMetadataCollection: PlaylistMetadata[],
    youtubeMetadata: YoutubePlaylistMetadataResponse
  ): ValidationResult {
    let validationResult: ValidationResult = { valid: true, message: "" };

    if (youtubeMetadata.items.length === 0) {
      validationResult = { valid: false, message: "Invalid playlist id" };
    }

    if (
      playlistMetadataCollection.find((metadata) => metadata.id === playlistId)
    ) {
      validationResult = {
        valid: false,
        message: "Playlists cannot be duplicated",
      };
    }

    return validationResult;
  }
}

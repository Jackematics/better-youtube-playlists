import { ValidationResult } from "../types/validation-types";
import {
  PlaylistMetadata,
  YoutubeMetadataResponse,
} from "../types/youtube-metadata-types";

export default class PlaylistValidator {
  public static validatePlaylistData(
    playlistId: string,
    playlistMetadataCollection: PlaylistMetadata[],
    youtubeMetadata: YoutubeMetadataResponse
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

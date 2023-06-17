import { ValidationResult } from "../types/validation-types";
import { YoutubeMetadataResponse } from "../types/youtube-metadata-types";

export default class ValidationHandler {
  public static validateYoutubeMetadata(
    youtubeMetadata: YoutubeMetadataResponse
  ): ValidationResult {
    return youtubeMetadata.items.length > 0
      ? { valid: true, message: "" }
      : { valid: false, message: "Invalid playlist id" };
  }
}

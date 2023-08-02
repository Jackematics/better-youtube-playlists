import Config from "../config";
import { YoutubePlaylistItemsResponse } from "../types/youtube-playlist-items-response-types";
import { YoutubePlaylistMetadataResponse } from "../types/youtube-playlist-metadata-types";

export default class FetchHandler {
  public static async fetchYoutubePlaylistMetadata(
    playlistId: string
  ): Promise<YoutubePlaylistMetadataResponse> {
    return (await FetchHandler.fetch(
      `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${Config.youtubeApiKey}`
    )) as YoutubePlaylistMetadataResponse;
  }

  public static async fetchYoutubePlaylistItemsData(
    playlistId: string
  ): Promise<YoutubePlaylistItemsResponse> {
    return (await FetchHandler.fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${Config.youtubeApiKey}`
    )) as YoutubePlaylistItemsResponse;
  }

  private static async fetch(url: string): Promise<unknown> {
    const res: Response = await fetch(url);

    return await res.json();
  }
}

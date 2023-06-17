import process from "process";

export default class Config {
  public static readonly youtubeApiKey =
    process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
}

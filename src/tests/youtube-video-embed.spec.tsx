import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import Home from "../app/page";
import FetchHandler from "../app/handlers/fetch-handler";
import { addTestPlaylistPath } from "./test-utils";
import TestData from "./test-data";

let originalFetchPlaylistMetadata = FetchHandler.fetchYoutubePlaylistMetadata;
let originalFetchPlaylistItemsData = FetchHandler.fetchYoutubePlaylistItemsData;

describe("YoutubeVideoEmbed", () => {
  beforeEach(() => {
    FetchHandler.fetchYoutubePlaylistMetadata = jest
      .fn()
      .mockResolvedValue(TestData.youtubePlaylistMetadata);

    FetchHandler.fetchYoutubePlaylistItemsData = jest
      .fn()
      .mockResolvedValue(TestData.youtubePlaylistItemsData);
  });

  afterEach(() => {
    FetchHandler.fetchYoutubePlaylistMetadata = originalFetchPlaylistMetadata;
    FetchHandler.fetchYoutubePlaylistItemsData = originalFetchPlaylistItemsData;
  });

  it("should have a default background if no video has been selected", () => {
    render(<Home />);

    expect(screen.getByTitle("video-placeholder")).toBeInTheDocument();
  });
});

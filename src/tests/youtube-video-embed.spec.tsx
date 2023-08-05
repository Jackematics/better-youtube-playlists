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

  it("should have a default background if no playlist has been selected", () => {
    render(<Home />);

    expect(screen.getByTitle("video-placeholder")).toBeInTheDocument();
  });

  it("should select the first playlist item in the playlist when a playlist is selected", async () => {
    render(<Home />);

    await act(() => addTestPlaylistPath());
    await act(() => {
      fireEvent.click(screen.getByText("Test Playlist"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("Test Song 1")).toBeInTheDocument();
    });
  });

  it("should set a youtube video with the correct title on song click", async () => {
    render(<Home />);

    await act(() => addTestPlaylistPath());
    await act(() => {
      fireEvent.click(screen.getByText("Test Playlist"));
    });
    const playlistLiElement = screen.getByTestId("test-video-id-2");

    await act(() => fireEvent.click(playlistLiElement));

    await waitFor(() => {
      expect(screen.getByTestId("Test Song 2")).toBeInTheDocument();
    });
  });
});

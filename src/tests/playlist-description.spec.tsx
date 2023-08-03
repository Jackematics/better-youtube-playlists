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

describe("PlaylistDescription", () => {
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

  it("should say 'No Playlist Selected' by default", () => {
    render(<Home />);

    expect(screen.getByText("No Playlist Selected")).toBeInTheDocument();
  });

  it("should populate the playlist description container with information about the selected playlist", async () => {
    render(<Home />);

    await act(() => addTestPlaylistPath());
    await act(() => {
      fireEvent.click(screen.getByText("Test Playlist"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("selected-playlist-title")).toHaveTextContent(
        "Test Playlist"
      );
      expect(screen.getByText("Test Channel Title")).toBeInTheDocument();
      expect(screen.getByText("123 videos")).toBeInTheDocument();
      expect(
        screen.queryByText("No Playlist Selected")
      ).not.toBeInTheDocument();
    });
  });
});

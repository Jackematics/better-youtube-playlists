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

  it("should populate the playlist container with playlist items", async () => {
    render(<Home />);

    await act(() => addTestPlaylistPath());
    await act(() => {
      fireEvent.click(screen.getByText("Test Playlist"));
    });

    const playlistUlElement = screen.getByTestId("playlist");
    const liElement = playlistUlElement.querySelectorAll("li")[1];

    const songData = liElement.querySelectorAll("p");

    const songNumber = songData[0];
    const songTitle = songData[1];

    await waitFor(() => {
      expect(songNumber).toHaveTextContent("2");
      expect(songTitle).toHaveTextContent("Test Song 2");
    });
  });
});

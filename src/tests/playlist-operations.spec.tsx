import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import Home from "../app/page";
import FetchHandler from "../app/handlers/fetch-handler";
import TestData from "./test-data";
import { addTestPlaylistPath } from "./test-utils";

let originalFetchPlaylistMetadata = FetchHandler.fetchYoutubePlaylistMetadata;
let originalFetchPlaylistItemsData = FetchHandler.fetchYoutubePlaylistItemsData;

describe("PlaylistOperations", () => {
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

  it("should not display operations if no playlist is selected", () => {
    render(<Home />);

    expect(screen.queryByTestId("playlist-operations")).not.toBeInTheDocument();
  });

  it("should go to the previous video if the previous button is selected", async () => {
    render(<Home />);

    await act(() => addTestPlaylistPath());
    await act(() => {
      fireEvent.click(screen.getByText("Test Playlist"));
    });
    const playlistLiElement = screen.getByTestId("test-video-id-2");

    await act(() => fireEvent.click(playlistLiElement));
    await act(() =>
      fireEvent.click(screen.getByTestId("previous-playlist-item-button"))
    );

    await waitFor(() => {
      expect(screen.getByTestId("Test Song 1")).toBeInTheDocument();
    });
  });

  it("should go to the next video if the previous button is selected", async () => {
    render(<Home />);

    await act(() => addTestPlaylistPath());
    await act(() => {
      fireEvent.click(screen.getByText("Test Playlist"));
    });
    const playlistLiElement = screen.getByTestId("test-video-id-1");

    await act(() => fireEvent.click(playlistLiElement));
    await act(() =>
      fireEvent.click(screen.getByTestId("next-playlist-item-button"))
    );

    await waitFor(() => {
      expect(screen.getByTestId("Test Song 2")).toBeInTheDocument();
    });
  });
});

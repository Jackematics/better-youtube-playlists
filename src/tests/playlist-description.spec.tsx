import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import Home from "../app/page";
import FetchHandler from "../app/handlers/fetch-handler";

let originalFetch = FetchHandler.fetch;

const addTestPlaylist = () => {
  const addPlaylistButton = screen.getByRole("button", {
    name: /Add Playlist/i,
  });
  const playlistIdInput = screen.getByTestId("playlist-id-input");
  const addButton = screen.getByTestId("add-id-button");

  fireEvent.click(addPlaylistButton);
  fireEvent.change(playlistIdInput, {
    target: { value: "test-playlist-id" },
  });
  fireEvent.click(addButton);
};

describe("PlaylistDescription", () => {
  beforeEach(() => {
    const mockFetch = jest.fn().mockResolvedValue({
      items: [
        {
          id: "test-id",
          snippet: {
            title: "Test Playlist",
            channelTitle: "Test Channel Title",
          },
        },
      ],
    });

    FetchHandler.fetch = mockFetch;
  });

  afterEach(() => {
    FetchHandler.fetch = originalFetch;
  });

  it("should populate the playlist description container with information about the selected playlist", () => {
    render(<Home />);

    addTestPlaylist();

    waitFor(() => {
      const testPlaylist = screen.getByText("Test Playlist");
      fireEvent.click(testPlaylist);
      expect(screen.getByTestId("selected-playlist-title")).toHaveTextContent(
        "Test Playlist"
      );
      expect(screen.getByText("Test Channel Title")).toBeInTheDocument();
    });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../app/page";
import useYoutubeDataFetcher from "../app/hooks/useYoutubeDataFetcher";

jest.mock("../app/hooks/useYoutubeDataFetcher");
describe("When attempting to add a new playlist to the playlist list", () => {
  beforeEach(() => {
    const mockUseYoutubeDataFetcher =
      useYoutubeDataFetcher as jest.MockedFunction<
        typeof useYoutubeDataFetcher
      >;

    mockUseYoutubeDataFetcher.mockReturnValue({
      addPlaylistId: jest.fn(),
      playlistMetadataCollection: [
        {
          id: "test-id",
          title: "Test Playlist",
        },
      ],
    });
  });

  describe("AddPlaylistModal", () => {
    it("should be closed by default", () => {
      render(<Home />);

      const addPlaylistModal = screen.getByTestId("add-playlist-modal-wrapper");

      expect(addPlaylistModal).toHaveClass("hidden");
    });

    it("should open when the Add Playlist button is selected", () => {
      render(<Home />);

      const addPlaylistModal = screen.getByTestId("add-playlist-modal-wrapper");
      const addPlaylistButton = screen.getByRole("button", {
        name: /Add Playlist/i,
      });

      fireEvent.click(addPlaylistButton);

      expect(addPlaylistModal).not.toHaveClass("hidden");
    });

    it("should close the modal if anywhere outside the modal is selected", () => {
      render(<Home />);

      const addPlaylistModal = screen.getByTestId("add-playlist-modal-wrapper");
      const addPlaylistButton = screen.getByRole("button", {
        name: /Add Playlist/i,
      });
      const outsideModalElement = screen.getByText("Playlists");

      fireEvent.click(addPlaylistButton);
      fireEvent.click(outsideModalElement);

      expect(addPlaylistModal).toHaveClass("hidden");
    });

    it("should close the modal when cancel is clicked", () => {
      render(<Home />);

      const addPlaylistModal = screen.getByTestId("add-playlist-modal-wrapper");
      const addPlaylistButton = screen.getByRole("button", {
        name: /Add Playlist/i,
      });
      const cancelButton = screen.getByRole("button", { name: /Cancel/i });

      fireEvent.click(addPlaylistButton);
      fireEvent.click(cancelButton);

      expect(addPlaylistModal).toHaveClass("hidden");
    });

    it("should add a new playlist to the playlist list if the Add button is clicked when a valid playlist id is given", () => {
      render(<Home />);

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

      expect(screen.getByText("Test Playlist")).toBeInTheDocument();
    });
  });
});

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

describe("PlaylistList", () => {
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

    it("should do nothing if an element outside of the open modal is clicked", () => {
      render(<Home />);

      const addPlaylistModal = screen.getByTestId("add-playlist-modal-wrapper");
      const addPlaylistButton = screen.getByRole("button", {
        name: /Add Playlist/i,
      });

      fireEvent.click(addPlaylistButton);
      fireEvent.click(addPlaylistButton);

      expect(addPlaylistModal).not.toHaveClass("hidden");
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

    it("should add a new playlist to the playlist list if the Add button is clicked when a valid playlist id is given", async () => {
      render(<Home />);

      await act(() => addTestPlaylistPath());

      await waitFor(() => {
        expect(screen.getByText("Test Playlist")).toBeInTheDocument();
      });
    });

    describe("Modal validation", () => {
      it("should show a validation message if an invalid playlist id is sent", async () => {
        render(<Home />);

        FetchHandler.fetchYoutubePlaylistMetadata = jest
          .fn()
          .mockResolvedValue({
            items: [],
          });

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

        await waitFor(() => {
          expect(screen.getByText("Invalid playlist id")).toBeInTheDocument();
        });
      });

      it("should show a validation message if a duplicate playlist is added", async () => {
        render(<Home />);

        await act(() => addTestPlaylistPath());
        await act(() => addTestPlaylistPath());

        expect(screen.getAllByText("Test Playlist").length).toBe(1);

        await waitFor(() => {
          expect(
            screen.getByText("Playlists cannot be duplicated")
          ).toBeInTheDocument();
        });
      });

      it("should show a validation message if there is an issue calling the youtube api", async () => {
        FetchHandler.fetchYoutubePlaylistMetadata = jest
          .fn()
          .mockRejectedValue(new Error());

        render(<Home />);

        await act(() => addTestPlaylistPath());

        await waitFor(() => {
          expect(screen.getByText("Internal server error")).toBeInTheDocument();
        });
      });
    });
  });
});

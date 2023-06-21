import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../app/page";
import FetchHandler from "../app/handlers/fetch-handler";
import { addTestPlaylistPath } from "./test-utils";

let originalFetch = FetchHandler.fetch;
describe("PlaylistList", () => {
  beforeEach(() => {
    const mockFetch = jest.fn().mockResolvedValue({
      items: [
        {
          id: "test-id",
          snippet: {
            title: "Test Playlist",
          },
        },
      ],
    });

    FetchHandler.fetch = mockFetch;
  });

  afterEach(() => {
    FetchHandler.fetch = originalFetch;
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

    it("should add a new playlist to the playlist list if the Add button is clicked when a valid playlist id is given", () => {
      render(<Home />);

      addTestPlaylistPath();

      waitFor(() => {
        expect(screen.getByText("Test Playlist")).toBeInTheDocument();
      });
    });

    describe("Modal validation", () => {
      it("should show a validation message if an invalid playlist id is sent", () => {
        render(<Home />);

        const mockFetchInvalidId = jest.fn().mockResolvedValue({
          items: [],
        });
        FetchHandler.fetch = mockFetchInvalidId;

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

        waitFor(() => {
          expect(screen.getByText("Invalid playlist id")).toBeInTheDocument();
        });
      });

      it("should clear the playlist id input and validation messages if the playlist is closed", () => {
        const mockFetchInvalidId = jest.fn().mockResolvedValue({
          items: [],
        });
        FetchHandler.fetch = mockFetchInvalidId;

        render(<Home />);

        const addPlaylistButton = screen.getByRole("button", {
          name: /Add Playlist/i,
        });
        const playlistIdInput = screen.getByTestId("playlist-id-input");
        const addButton = screen.getByTestId("add-id-button");
        const cancelButton = screen.getByRole("button", { name: /Cancel/i });

        fireEvent.click(addPlaylistButton);
        fireEvent.change(playlistIdInput, {
          target: { value: "test-playlist-id" },
        });
        fireEvent.click(addButton);
        fireEvent.click(cancelButton);
        fireEvent.click(addPlaylistButton);

        waitFor(() => {
          expect(
            screen.getByText("Invalid playlist id")
          ).not.toBeInTheDocument();
          expect(screen.getByText("test-playlist-id")).not.toBeInTheDocument();
        });
      });

      it("should show a validation message if a duplicate playlist is added", async () => {
        render(<Home />);

        await addTestPlaylistPath();
        await addTestPlaylistPath();

        expect(screen.getAllByText("Test Playlist").length).toBe(1);

        waitFor(() => {
          expect(
            screen.getByText("Playlists cannot be duplicated")
          ).toBeInTheDocument();
        });
      });

      it("should show a validation message if there is an issue calling the youtube api", async () => {
        const mockFetchApiError = jest.fn().mockRejectedValue(new Error());
        FetchHandler.fetch = mockFetchApiError;

        render(<Home />);

        await addTestPlaylistPath();

        waitFor(() => {
          expect(screen.getByText("Internal server error")).toBeInTheDocument();
        });
      });
    });
  });
});

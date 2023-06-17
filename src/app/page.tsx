"use client";

import { useState } from "react";
import AddPlaylistModal from "./components/playlist-list/AddPlaylistModal";
import PlaylistList from "./components/playlist-list/PlaylistList";
import useYoutubeDataFetcher from "./hooks/useYoutubeDataFetcher";
import { ValidationResult } from "./types/validation-types";

const Home = () => {
  const [addPlaylistModalOpen, setAddPlaylistModalOpen] =
    useState<boolean>(false);
  const { addPlaylistId, playlistMetadataCollection } = useYoutubeDataFetcher();

  const openAddPlaylistModal = (): void => {
    setAddPlaylistModalOpen(true);
  };

  const closeAddPlaylistModal = (): void => {
    if (addPlaylistModalOpen) {
      setAddPlaylistModalOpen(false);
    }
  };

  const handleAddPlaylistId = async (
    playlistId: string
  ): Promise<ValidationResult> => {
    const validationResult = await addPlaylistId(playlistId);
    return validationResult;
  };

  return (
    <main className="bg-background-dark-blue">
      <div
        className={
          addPlaylistModalOpen ? "modal-backdrop pointer-events-none" : ""
        }
      >
        <PlaylistList
          openAddPlaylistModalCallback={openAddPlaylistModal}
          playlistMetadataCollection={playlistMetadataCollection}
        />
      </div>
      <div
        className={addPlaylistModalOpen ? "" : "hidden"}
        data-testid="add-playlist-modal-wrapper"
      >
        <AddPlaylistModal
          addPlaylistIdCallback={handleAddPlaylistId}
          closePlaylistModalCallback={closeAddPlaylistModal}
        />
      </div>
    </main>
  );
};

export default Home;

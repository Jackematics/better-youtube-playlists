"use client";

import { useState } from "react";
import AddPlaylistModal from "./components/playlist-list/AddPlaylistModal";
import PlaylistList from "./components/playlist-list/PlaylistList";
import useYoutubeDataFetcher from "./hooks/useYoutubeDataFetcher";
import { ValidationResult } from "./types/validation-types";
import { PlaylistMetadata } from "./types/youtube-metadata-types";
import PlaylistDescription from "./components/playlist-description/PlaylistDescription";

const Home = () => {
  const [addPlaylistModalOpen, setAddPlaylistModalOpen] =
    useState<boolean>(false);
  const { handleAddPlaylistId: addPlaylistId, playlistMetadataCollection } =
    useYoutubeDataFetcher();
  const [selectedPlaylistMetadata, setSelectedPlaylistMetadata] = useState<
    PlaylistMetadata | undefined
  >(undefined);

  const openAddPlaylistModal = (): void => {
    setAddPlaylistModalOpen(true);
  };

  const handleAddPlaylistId = async (
    playlistId: string
  ): Promise<ValidationResult> => {
    const validationResult = await addPlaylistId(playlistId);
    return validationResult;
  };

  const closeAddPlaylistModal = (): void => {
    if (addPlaylistModalOpen) {
      setAddPlaylistModalOpen(false);
    }
  };

  const handleSelectPlaylist = (playlistMetadata: PlaylistMetadata): void => {
    setSelectedPlaylistMetadata(playlistMetadata);
  };

  return (
    <main className="bg-background-dark-blue">
      <div
        className={`flex justify-center ${
          addPlaylistModalOpen ? "modal-backdrop pointer-events-none" : ""
        }`}
      >
        <div className="flex-initial min-w-[18rem] w-72 h-[56.5rem] bg-container-dark-blue mt-4 mr-4 border-4 relative">
          <PlaylistList
            playlistMetadataCollection={playlistMetadataCollection}
            openAddPlaylistModalCallback={openAddPlaylistModal}
            selectPlaylistCallback={handleSelectPlaylist}
          />
        </div>
        <div className="flex-initial min-w-[38rem] h-[26rem] bg-black mt-4 mr-4 relative"></div>
        <div className="flex-initial w-[40rem] h-[18.5rem] min-w-[30rem] bg-container-dark-blue mt-4 border-4 relative">
          <PlaylistDescription
            selectedPlaylistMetadata={selectedPlaylistMetadata}
          />
        </div>
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

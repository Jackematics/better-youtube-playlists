"use client";

import { useState } from "react";
import AddPlaylistModal from "./components/playlist-list/AddPlaylistModal";
import PlaylistList from "./components/playlist-list/PlaylistList";
import useYoutubeMetadataFetcher from "./hooks/useYoutubeMetadataFetcher";
import {
  PlaylistMetadata,
  SelectedPlaylistMetadata,
} from "./types/youtube-playlist-metadata-types";
import PlaylistDescription from "./components/playlist-description/PlaylistDescription";
import useYoutubePlaylistItemsFetcher from "./hooks/useYoutubePlaylistItemsFetcher";
import { PlaylistData } from "./types/youtube-playlist-items-types";
import Playlist from "./components/playlist/Playlist";

const Home = () => {
  const [addPlaylistModalOpen, setAddPlaylistModalOpen] =
    useState<boolean>(false);
  const {
    updatePlaylistMetadataState,
    playlistMetadataCollection,
    playlistMetadataValidationResult,
  } = useYoutubeMetadataFetcher();

  const { updatePlaylistItemCollectionState, playlistItemCollection } =
    useYoutubePlaylistItemsFetcher();

  const [selectedPlaylistMetadata, setSelectedPlaylistMetadata] = useState<
    SelectedPlaylistMetadata | undefined
  >();
  const [selectedPlaylistData, setSelectedPlaylistData] = useState<
    PlaylistData | undefined
  >();

  const openAddPlaylistModal = (): void => {
    setAddPlaylistModalOpen(true);
  };

  const handleAddPlaylistId = async (playlistId: string): Promise<void> => {
    await updatePlaylistMetadataState(playlistId);

    if (playlistMetadataValidationResult.valid) {
      await updatePlaylistItemCollectionState(playlistId);
    }
  };

  const closeAddPlaylistModal = (): void => {
    if (addPlaylistModalOpen) {
      setAddPlaylistModalOpen(false);
    }
  };

  const handleSelectPlaylist = (playlistMetadata: PlaylistMetadata): void => {
    const selectedPlaylist = playlistItemCollection.find(
      (item: PlaylistData) => item.id === playlistMetadata.id
    )!;

    setSelectedPlaylistMetadata({
      ...playlistMetadata,
      totalResults: selectedPlaylist.totalResults,
    });
    setSelectedPlaylistData(selectedPlaylist);
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
        <div>
          <div className="flex flex-row">
            <div className="flex-initial min-w-[38rem] h-[26rem] bg-black mt-4 mr-4 relative"></div>
            <div className="flex-initial w-[40rem] h-[18.5rem] min-w-[30rem] bg-container-dark-blue mt-4 border-4 relative">
              <PlaylistDescription
                selectedPlaylistMetadata={selectedPlaylistMetadata}
              />
            </div>
          </div>
          <div className="w-[79rem] h-[29.5rem] min-w-[30rem] bg-container-dark-blue mt-4 border-4 relative overflow-y-scroll">
            <Playlist selectedPlaylistData={selectedPlaylistData} />
          </div>
        </div>
      </div>
      <div
        className={addPlaylistModalOpen ? "" : "hidden"}
        data-testid="add-playlist-modal-wrapper"
      >
        <AddPlaylistModal
          playlistMetadataValidationResult={playlistMetadataValidationResult}
          addPlaylistIdCallback={handleAddPlaylistId}
          closePlaylistModalCallback={closeAddPlaylistModal}
        />
      </div>
    </main>
  );
};

export default Home;

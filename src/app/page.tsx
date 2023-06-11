'use client'

import { useState } from "react";
import AddPlaylistModal from "./components/client/playlist-list/AddPlaylistModal";
import PlaylistList from "./components/client/playlist-list/PlaylistList";
import YoutubePlaylistDataFetcher from "./components/server/YoutubePlaylistDataFetcher";

const Home = () => {
  const [addPlaylistModalOpen, setAddPlaylistModalOpen] = useState<boolean>(false);

  const openAddPlaylistModal = (): void => {
    setAddPlaylistModalOpen(true)
  }

  const closeAddPlaylistModal = (): void => {
    if (addPlaylistModalOpen) {
      setAddPlaylistModalOpen(false)
    }
  }

  return (
    <main className="bg-background-dark-blue">
      <div className={addPlaylistModalOpen ? "modal-backdrop" : ""} onClick={closeAddPlaylistModal}>
        <YoutubePlaylistDataFetcher openAddPlaylistModalCallback={openAddPlaylistModal} />
      </div>
      <div className={addPlaylistModalOpen ? "" : "hidden"} data-testid='add-playlist-modal-wrapper'>
        <AddPlaylistModal closePlaylistModalCallback={closeAddPlaylistModal} />
      </div>
    </main>
  )
}

export default Home
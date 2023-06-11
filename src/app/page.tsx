'use client'

import { useState } from "react";
import AddPlaylistModal from "./components/playlist-list/AddPlaylistModal";
import PlaylistList from "./components/playlist-list/PlaylistList";

const Home = () => {
  const [addPlaylistModalOpen, setAddPlaylistModalOpen] = useState<boolean>(false);

  const openAddPlaylistModal = (): void => {
    setAddPlaylistModalOpen(true)
  }

  const closeAddPlaylistModalModal = (): void => {
    if (addPlaylistModalOpen) {
      setAddPlaylistModalOpen(false)
    }
  }

  return (
    <main className="bg-background-dark-blue">
      <div className={addPlaylistModalOpen ? "modal-backdrop" : ""} onClick={closeAddPlaylistModalModal}>
        <PlaylistList openAddPlaylistModalCallback={openAddPlaylistModal} />
      </div>
      <div className={addPlaylistModalOpen ? "" : "hidden"} data-testid='add-playlist-modal-wrapper'>
        <AddPlaylistModal closePlaylistModalCallback={closeAddPlaylistModalModal} />
      </div>
    </main>
  )
}

export default Home
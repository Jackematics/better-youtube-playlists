'use client'

import { useState } from "react";
import AddPlaylistModal from "./components/playlist-list/AddPlaylistModal";
import PlaylistList from "./components/playlist-list/PlaylistList";

const Home = () => {
  const [addPlaylistModalOpen, setAddPlaylistModalOpen] = useState<boolean>(false);

  const handleToggleAddPlaylistModal = (): void => {
    setAddPlaylistModalOpen(!addPlaylistModalOpen)
  }

  const handleCloseAddPlaylistModalModal = (): void => {
    if (addPlaylistModalOpen) {
      setAddPlaylistModalOpen(false)
    }
  }

  return (
    <main className="bg-background-dark-blue">
      <div className={addPlaylistModalOpen ? "modal-backdrop" : ""} onClick={handleCloseAddPlaylistModalModal}>
        <PlaylistList openAddPlaylistModalCallback={handleToggleAddPlaylistModal} />
      </div>
      <div className={addPlaylistModalOpen ? "" : "hidden"} data-testid='add-playlist-modal-wrapper'>
        <AddPlaylistModal />
      </div>
    </main>
  )
}

export default Home
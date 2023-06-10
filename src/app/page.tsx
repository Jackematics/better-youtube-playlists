'use client'

import { useState } from "react";
import AddPlaylistModal from "./components/playlist-list/AddPlaylistModal";
import PlaylistList from "./components/playlist-list/PlaylistList";

const Home = () => {
  const [addPlaylistModalOpen, setAddPlaylistModalOpen] = useState<boolean>(false);

  const handleAddPlaylist = (): void => {
      setAddPlaylistModalOpen(!addPlaylistModalOpen)
  }

  return (
    <main className="bg-background-dark-blue">
      <div className={addPlaylistModalOpen ? "modal-backdrop" : ""}>
        <PlaylistList addPlaylistCallback={handleAddPlaylist} />
      </div>
      <div className={addPlaylistModalOpen ? "" : "hidden"} data-testid='add-playlist-modal-wrapper'>
        <AddPlaylistModal />
      </div>
    </main>
  )
}

export default Home
import AddPlaylistModal from "./components/playlist-list/AddPlaylistModal";
import PlaylistList from "./components/playlist-list/PlaylistList";

const Home = () => {
  return (
    <main className="bg-background-dark-blue">
      <PlaylistList />
      <AddPlaylistModal />
    </main>
  )
}

export default Home
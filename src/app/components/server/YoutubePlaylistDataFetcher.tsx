import PlaylistList from "../client/playlist-list/PlaylistList";

type YoutubePlaylistDataFetcherProps = {
  openAddPlaylistModalCallback: () => void
}

const YoutubePlaylistDataFetcher = ({ openAddPlaylistModalCallback }: YoutubePlaylistDataFetcherProps) => {
  return (
    <>
      <PlaylistList openAddPlaylistModalCallback={openAddPlaylistModalCallback} />
    </>
  )
}

export default YoutubePlaylistDataFetcher
import { SelectedPlaylistMetadata } from "@/app/types/youtube-playlist-metadata-types";

type PlaylistDescriptionProps = {
  selectedPlaylistMetadata: SelectedPlaylistMetadata | undefined;
  currentVideoIndex: number;
};

const PlaylistDescription = ({
  selectedPlaylistMetadata,
  currentVideoIndex,
}: PlaylistDescriptionProps) => {
  return (
    <>
      {selectedPlaylistMetadata ? (
        <>
          <h2
            className="h-[5rem] text-white text-7xl font-bold text-shadow-black-thick mt-6 ml-5 truncate"
            data-testid="selected-playlist-title"
          >
            {selectedPlaylistMetadata.title}
          </h2>
          <p className="text-white text-4xl font-semibold text-shadow-black mt-12 ml-5">
            {selectedPlaylistMetadata.channelTitle}
          </p>
          <p className="text-white text-4xl font-semibold text-shadow-black mt-12 ml-5">
            {`Videos: ${currentVideoIndex + 1}/${
              selectedPlaylistMetadata.totalResults
            }`}
          </p>
        </>
      ) : (
        <h3 className="text-white text-6xl font-bold text-shadow-black-thick mt-10 ml-5">
          No Playlist Selected
        </h3>
      )}
    </>
  );
};

export default PlaylistDescription;

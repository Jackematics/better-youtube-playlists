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
      <div className="flex-initial w-[40rem] h-[18.5rem] min-w-[30rem] bg-container-dark-blue mt-4 border-4 relative">
        <h2
          className="h-[5rem] text-white text-7xl font-bold text-shadow-black-thick mt-5 ml-5 truncate"
          data-testid="selected-playlist-title"
        >
          {selectedPlaylistMetadata ? selectedPlaylistMetadata.title : ""}
        </h2>
        {selectedPlaylistMetadata ? (
          ""
        ) : (
          <h3 className="text-white text-6xl font-bold text-shadow-black-thick mt-5 ml-5">
            No Playlist Selected
          </h3>
        )}
        <p className="text-white text-4xl font-semibold text-shadow-black mt-10 ml-5">
          {selectedPlaylistMetadata
            ? selectedPlaylistMetadata.channelTitle
            : ""}
        </p>
        <p className="text-white text-4xl font-semibold text-shadow-black mt-9 ml-5">
          {selectedPlaylistMetadata
            ? `Videos: ${currentVideoIndex + 1}/${
                selectedPlaylistMetadata.totalResults
              }`
            : ""}
        </p>
      </div>
    </>
  );
};

export default PlaylistDescription;

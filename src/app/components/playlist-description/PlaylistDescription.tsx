import { PlaylistMetadata } from "@/app/types/youtube-metadata-types";

type PlaylistDescriptionProps = {
  selectedPlaylistMetadata: PlaylistMetadata | undefined;
};

const PlaylistDescription = ({
  selectedPlaylistMetadata,
}: PlaylistDescriptionProps) => {
  return (
    <>
      <div className="w-[54.5rem] h-[18.5rem] bg-container-dark-blue mt-7 border-4 relative">
        <h2
          className="text-white text-7xl font-bold text-shadow-black-thick mt-5 ml-5"
          data-testid="selected-playlist-title"
        >
          {selectedPlaylistMetadata ? selectedPlaylistMetadata.title : ""}
        </h2>
        <p className="text-white text-4xl font-semibold text-shadow-black mt-10 ml-5">
          {selectedPlaylistMetadata
            ? selectedPlaylistMetadata.channelTitle
            : ""}
        </p>
        <p className="text-white text-4xl font-semibold text-shadow-black mt-9 ml-5">
          74 videos
        </p>
      </div>
    </>
  );
};

export default PlaylistDescription;
